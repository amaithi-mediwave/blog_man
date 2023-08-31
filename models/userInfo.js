

const mongoose = require("mongoose");


const userDetailSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please add the email id"],
            unique: [true, "Email address not matching."],
        },
        name: {
            type: String,
            required: [true, "Please give your name"],
        },
        about: {
            type: String,
            required: [true, "Please fill out the about"]
        }
    }
);


module.exports = mongoose.model("User_info", userDetailSchema);