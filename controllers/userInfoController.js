
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const User_info = require("../models/userInfo");
const ObjectId = require('mongodb').ObjectID;


//@desc Create User info
//@route GET /api/users/user-info
//@access private

const createUserInfo = asyncHandler(async (req, res) => {
    // const {uuser} = req.user;
    const { email, name, about } = req.body;
    
    if (!email || !name || !about) {
      res.status(400);
      throw new Error("All Fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    // const user_id = 
    // const userInfoAvailable = await User_info.findOne({user_id: ObjectId(userAvailable['_id']) });
    // console.log(userAvailable)
    // console.log(userInfoAvailable)

    // if (!userAvailable) {
    //   res.status(400);
    //   throw new Error("In-valid Registered Email address");
    // } else if (userInfoAvailable) {
    //   res.status(400);
    //   throw new Error("User Info already Available");
    // }
  
  
    // Adding user info to the DB
    const user = await User_info.create({
      user_id: req.user.id,
      email,
      name,
      about,
      
    });

    console.log(`User info Created ${user.name}`);
    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        name: user.name,
        about: user.about,
      });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
    // res.json({ message: `Registered the user ${user.username}` });
  });
  



  //@desc update user Info
  //@route GET /api/users/user-info
  //@access private
  
  const updateUserInfo = asyncHandler(async (req, res) => {
      const { email, name, about } = req.body;
      if(!email) {
          res.status(400);
          throw new Error("Email Mandatory");
  
      }
      const user = await User.findOne({ email });
      // Compare the password and hashed password
      if(user && (await bcrypt.compare(password, user.password))){
          const accessToken = jwt.sign({
              user: {
                  username: user.username,
                  email: user.email,
                  id: user.id,
              },
          }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: "15m"
          });
          res.status(200).json({
              accessToken 
          });
      }else {
          res.status(401)
          throw new Error("email or password is not valid");
      }
  });
  
  //@desc current user info
  //@route GET /api/users/current
  //@access private
  
  const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });
  
  module.exports = { createUserInfo, updateUserInfo, currentUser };
  
