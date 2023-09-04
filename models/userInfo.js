

const mongoose = require("mongoose");


const userDetailSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            unique: [true, "User info already exists"],
        },
        name: {
            type: String,
            required: [true, "Please give your name"],
        },
        dob: {
            type: String,
            required: [true, "fill the dob"],
        },
        profession: {
            type: String,
            required: [true, 'fill the profession'],
        },
        interests: {
            type: String,
            required: [true, 'provide your interestes'],
        },
        about: {
            type: String,
            required: [true, "Please fill out the about"]
        }
    }, { timestamps: true },
    
);


module.exports = mongoose.model("User_info", userDetailSchema);