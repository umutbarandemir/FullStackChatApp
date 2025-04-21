import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlenghth: 6,
    maxLength: 30,
  },
  profilePic:{
    type: String,
    default: "",
  }
},{timestamps: true});

const User = mongoose.model("User", userSchema); // Create a model named "User" using the userSchema
export default User; // Export the User model for use in other parts of the application