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
    password: {
      type: String,

      required: [true, "Please provide the password"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
