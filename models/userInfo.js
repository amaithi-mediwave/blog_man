

const mongoose = require("mongoose");


const authorDetailSchema = mongoose.Schema(
    {
        author_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            unique: [true, "User info already exists"],
        },
        first_name: {
            type: String,
            required: [true, "Please give your name"],
        },
        last_name: {
            type: String,
            required: true,
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
    }, { timestamps: true, versionKey: false },
    
);


module.exports = mongoose.model("authorInfo", authorDetailSchema);