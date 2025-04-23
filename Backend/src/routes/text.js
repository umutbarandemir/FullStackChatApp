import express from "express"; // Importing express to create a router
import { protectRoute } from "../middleware/authMiddleware.js";
import { getUsersForSidebar } from "../controllers/textcontroller.js"; // Importing the getUsersForSidebar controller

const router = express.Router(); 

router.get("/users",protectRoute, getUsersForSidebar); // Define a GET route for users using the getUsersForSidebar controller

export default router; // Export the router