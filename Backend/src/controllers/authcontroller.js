import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js"; // Import the User model
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

export const signup = async (req, res) => {
    // res.send("signup route is working"); // Send a response when the root route is accessed
   
    const { email, password, fullName } = req.body; // Destructure email and password from the request body

    if (!email || !password || !fullName) {
        return res.status(400).json({ message: "Please fill all the fields" }); // Send a 400 response if any field is missing
    }

    try {

        if(password.length < 6 || password.length > 30) {
            return res.status(400).json({ message: "Password must be between 6 and 30 characters" }); // Send a 400 response if the password length is invalid
        }

        // Check if the user exists in the database
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists!!" }); // Send a 404 response if the user is not found
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt rounds of 10

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword, // Store the hashed password in the database
        });

        if(newUser){
            //generate token
            generateToken(newUser._id, res); // Generate a token for the user and send it in the response
            await newUser.save(); // Save the new user to the database
            return res.status(201).json({ message: "User created successfully", user: newUser }); // Send a 201 response if the user is created successfully    
        }else{
            return res.status(400).json({ message: "Invalid Credentials!!" }); // Send a 404 response if the user is not found
        }

    }catch (error) {
        console.error("Error finding user:", error); // Log the error to the console
        return res.status(500).json({ message: "Internal server error" }); // Send a 500 response if an error occurs
    }
};

export const login = async (req, res) => {
    // res.send("Login route is working"); // Send a response when the root route is accessed 

    const { email, password } = req.body; // Destructure email and password from the request body

    try {
        const user = await User.findOne({ email }); // Find the user in the database by email

        if (!user) {
            return res.status(404).json({ message: "User not found" }); // Send a 404 response if the user is not found
        }

        const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" }); // Send a 400 response if the password does not match
        }

        generateToken(user._id, res); // Generate a token for the user and send it in the response
        return res.status(200).json({ message: "Login successful", user }); // Send a 200 response if the login is successful
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error!!" }); // Send a 500 response if an error occurs
        console.error("Error finding user:", error); // Log the error to the console
    }  
};

export const logout = async (req, res) => {
    // res.send("logout route is working"); // Send a response when the root route is accessed

    try {
        res.clearCookie("token", { // Clear the token cookie from the response
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({ message: "Logout successful" }); // Send a 200 response if the logout is successful
    } catch (error) {
        res.status(500).json({ message: "Internal server error!!!!" }); // Send a 500 response if an error occurs
        console.error("Error logging out:", error); // Log the error to the console
    }
};