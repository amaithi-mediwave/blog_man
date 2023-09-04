const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const User_info = require("../models/userInfo");

//@desc Create User info
//@route POST /api/users/user-info
//@access private

const createUpdateUserInfo = asyncHandler(async (req, res) => {
  const { name, dob, profession, interests, about } = req.body;

  if (!name || !dob || !profession || !interests || !about) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
  const userAvailable = await User_info.findOne({ user_id: req.user.id });

  if (!userAvailable) {
    // Adding user info to the DB
    const user = await User_info.create({
      user_id: req.user.id,
      name,
      dob,
      profession,
      interests,
      about,
    });

    console.log(`User info Created ${user.name}`);

    if (user) {
      res.status(201).json({
        User_info_created: {
          name: user.name,
          dob: user.dob,
          profession: user.profession,
          interests: user.interests,
          about: user.about,
        },
      });
    }
  } else {
    try {
      const updatedInfo = await User_info.findOneAndUpdate(
        { user_id: req.user.id },
        req.body,
        {
          new: true, // for retriving the newly updated document from the DB
        }
      );

      console.log(`User info Updated for ${updatedInfo.name}`);
      res.status(200).json({
        updated_info: {
          name: updatedInfo.name,
          dob: updatedInfo.dob,
          profession: updatedInfo.profession,
          interests: updatedInfo.interests,
          about: updatedInfo.about,
        },
      });
    } catch {
      res.status(400);
      throw new Error("User data is not valid");
    }
  }
});

//@desc current user info
//@route GET /api/users/current
//@access private

const currentUserInfo = asyncHandler(async (req, res) => {
  const user_info = await User_info.findOne({ user_id: req.user.id });

  if (!user_info) {
    res
      .status(204)
      .json({ message: "User Info Doesn't Exists Create a New Info" });
  } else {
    res.status(200).json({
      user_info: {
        name: user_info.name,
        dob: user_info.dob,
        profession: user_info.profession,
        interests: user_info.interests,
        about: user_info.about,
      },
    });
  }
});

module.exports = { createUpdateUserInfo, currentUserInfo };
