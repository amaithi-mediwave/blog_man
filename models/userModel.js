const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username"],
    },
    email: {
      type: String,
      required: [true, "Please add the email id"],
      unique: [true, "Email address already exist."],
    },
    password_hash: {
      type: String,
      required: [true, "Please provide the password"],
    },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false },
);

module.exports = mongoose.model("User", userSchema, collection="users");
