import User from "../models/userModel.js"; // Import the User model
import Text from "../models/textModel.js"; // Import the Text model
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request object
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }) // Find all users except the logged-in user
            .select("-password"); // Exclude the password field from the result

        res.status(200).json(filteredUsers); // Send the filtered users as a response with a 200 status code
    } catch (error) {
        console.error("Error fetching users for sidebar:", error); // Log the error to the console
        res.status(500).json({ message: "Internal server error" }); // Send a 500 response if an error occurs
    }
}

export const getTexts = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request object

        const texts = await Text.find({
            $or: [
                { sender: loggedInUserId, receiver: id }, // Find texts where the logged-in user is the sender and the other user is the receiver
                { sender: id, receiver: loggedInUserId } // Find texts where the other user is the sender and the logged-in user is the receiver
            ]
        });

        res.status(200).json(texts); // Send the texts as a response with a 200 status code

    } catch (error) {
        console.error("Error fetching texts:", error); // Log the error to the console
        res.status(500).json({ message: "Internal server error" }); // Send a 500 response if an error occurs
    }
}

export const sendTexts = async (req, res) => {
    try {
        const { text , image } = req.body; // Get the text and image from the request body
        const { id:receiverId } = req.params; // Get the ID from the request parameters
        const senderID = req.user._id; // Get the logged-in user's ID from the request object

        let imageUrl = null; // Initialize imageUrl to null

        if(image) { // If an image is provided
            const uploadResponse = await cloudinary.uploader.upload(image) // Upload the image to Cloudinary
            imageUrl = uploadResponse.secure_url; // Get the secure URL of the uploaded image
        }

        let newText = await Text.create({ // Create a new text message
            text,
            image: imageUrl,
            senderId: senderID,
            receiverId: receiverId
        });

        await newText.save(); // Save the new text message to the database

        //this is where the functionality of sending the message to the receiver will be implemented with socket.io

        res.status(201).json(newText); // Send the new text message as a response with a 200 status code

    } catch (error) {
        console.error("Error sending texts:", error); // Log the error to the console
        res.status(500).json({ message: "Internal server error" }); // Send a 500 response if an error occurs
        
    }
}
