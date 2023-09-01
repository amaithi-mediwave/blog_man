

const mongoose = require("mongoose");


const userDetailSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: [true, "User info already exists"],
        },
        name: {
            type: String,
            required: [true, "Please give your name"],
        },
        about: {
            type: String,
            required: [true, "Please fill out the about"]
        }
    },{ timestamp: true }
    
);


module.exports = mongoose.model("User_info", userDetailSchema);