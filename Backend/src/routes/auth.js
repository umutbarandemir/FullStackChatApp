import express from "express"; // Importing express to create a router
import { login, logout, signup } from "../controllers/authcontroller.js";
const router = express.Router();     

router.post("/login", login); // Define a POST route for login using the login controller);

router.get("/logout", logout); // Define a GET route for logout using the logout controller

router.get("/signup",signup); // Define a GET route for signup using the signup controller


export default router; // Export the router