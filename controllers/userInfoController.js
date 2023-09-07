var moment = require('moment');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const User_Info = require("../models/userInfo");

//@desc Create User info
//@route POST /api/users/user-info
//@access private

const createUpdateUserInfo = asyncHandler(async (req, res) => {
  const { first_name, last_name, dob, profession, interests, about } = req.body;

  if (!first_name || !last_name || !dob || !profession || !interests || !about) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  } 
  let date = new Date(dob)
  let dat = date.toISOString()
  
  const userAvailable = await User_Info.findOne({ user_id: req.user.id });

  if (!userAvailable) {
    // Adding user info to the DB
    const user = await User_Info.create({
      user_id: req.user.id,
      first_name,
      last_name,
      dob: dat,
      profession,
      interests,
      about,
    });

    // console.log(`User info Created ${user.first_name}`);

    if (user) {
      res.status(201).json({
       User_Info_created: {
          name: `${user.first_name} ${user.last_name}`,
          dob: user.dob,
          profession: user.profession,
          interests: user.interests,
          about: user.about,
        },
      });
    }
  } else {
    try {
      const updatedInfo = await User_Info.findOneAndUpdate(
        { user_id: req.user.id },
        {first_name,
          last_name,
          dob: new Date(dob),
          profession,
          interests,
          about},
        {
          new: true, // for retriving the newly updated document from the DB
        }
      );

      console.log(`User info Updated for ${updatedInfo.first_name}`);
      res.status(200).json({
        updated_info: {
          name: `${updatedInfo.first_name} ${updatedInfo.last_name}`,
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
  
  const user_info = await User_Info.findOne({ user_id: req.user.id });
  
  if(user_info === null) {
    console.log(user_info);
    res.status(204);
    throw new Error("User Info Doesn't Exists Create a New Info");
    // .json({ message:  });
  } else {
    res.status(200).json({
     User_Info: {
        name: `${user_info.first_name} ${user_info.last_name}`,
        dob: user_info.dob,
        profession: user_info.profession,
        interests: user_info.interests,
        about: user_info.about,
      },
    });
  }
});

module.exports = { createUpdateUserInfo, currentUserInfo };
