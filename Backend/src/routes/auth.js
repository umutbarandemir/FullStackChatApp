import express from "express"; // Importing express to create a router
import { login, logout, signup , updateProfile, checkUser} from "../controllers/authcontroller.js";
import { protectRoute } from "../middleware/authMiddleware.js"; // Importing the protectRoute middleware

const router = express.Router();     

router.post("/login", login); // Define a POST route for login using the login controller

router.post("/logout", logout); // Define a GET route for logout using the logout controller

router.post("/signup", signup); // Define a GET route for signup using the signup controller

router.put("/update-profile", protectRoute , updateProfile); // Define a PUT route for update-profile using the updateProfile controller

router.get("/check", protectRoute, checkUser); // Define a GET route for check using the checkUser controller

export default router; // Export the router