const mongoose = require("mongoose");



//------------------------------------------------------
//            USER MODEL
//------------------------------------------------------

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




//------------------------------------------------------
//            USER-INFO MODEL
//------------------------------------------------------

const authorDetailSchema = mongoose.Schema(
  {
    user_id: {
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
      type: Date,
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
    },
    profile_pic: {
      type: String,
      default: "",
    },

  }, { timestamps: true, versionKey: false },

);




//---------------------------------------------------------------



// Creating Model Objects
userInfoModel = mongoose.model("userInfo", authorDetailSchema);
userModel = mongoose.model("user", userSchema, collection = "users");

// Exporting Models
module.exports = {
  userInfoModel,
  userModel
}