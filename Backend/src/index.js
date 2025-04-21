import express from "express";
import authRoutes from "./routes/auth.js"; // Importing the auth routes
import dotenv from "dotenv"; // Importing dotenv to load environment variables
import {connectDB} from "./lib/db.js"; // Importing the database connection function

const app = express();

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5001; // Set the port to either the environment variable PORT or 5000

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

app.use("/api/auth",authRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB(); // Connect to the database when the server starts
});