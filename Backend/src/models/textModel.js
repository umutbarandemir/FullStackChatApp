import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
    },
    image:{
        type: String,
    },
},{timestamps:true});

const Text = mongoose.model("Text", textSchema); // Create a model named "Text" based on the textSchema

export default Text; // Export the Text model based on the textSchema