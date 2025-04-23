import User from "../models/userModel.js"; // Import the User model

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