import express from "express";
import dotenv from "dotenv"; // Importing dotenv to load environment variables
import cookieParser from "cookie-parser"; // Importing cookie-parser to parse cookies
import cors from "cors"; // Importing cors to enable Cross-Origin Resource Sharing

import authRoutes from "./routes/auth.js"; // Importing the auth routes
import textRoutes from "./routes/text.js"; // Importing the message routes

import {connectDB} from "./lib/db.js"; // Importing the database connection function


const app = express();

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5001; // Set the port to either the environment variable PORT or 5000

// Allow larger JSON payloads (e.g., 10MB)
app.use(express.json({ limit: '10mb' })); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true , limit: '10mb' })); // Middleware to parse URL-encoded request bodies
app.use(cookieParser()); // Middleware to parse cookies from the request
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS for the specified origin and allow credentials

app.use("/api/auth",authRoutes);
app.use("/api/text",textRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB(); // Connect to the database when the server starts
});