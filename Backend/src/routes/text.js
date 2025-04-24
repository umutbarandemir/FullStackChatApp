import express from "express"; // Importing express to create a router
import { protectRoute } from "../middleware/authMiddleware.js";
import { getUsersForSidebar, getTexts, sendTexts } from "../controllers/textcontroller.js"; // Importing the getUsersForSidebar controller

const router = express.Router(); 

router.get("/users",protectRoute, getUsersForSidebar); // Define a GET route for users using the getUsersForSidebar controller

router.get("/:id", protectRoute, getTexts); // Define a GET route for texts using the getTexts controller

router.post("/send/:id", protectRoute, sendTexts); // Define a GET route for sending texts using the getTexts controller

export default router; // Export the router