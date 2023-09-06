const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route GET /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All Fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
  
    if (userAvailable) {
      res.status(400);
      throw new Error("User already Registered");
    }
  
    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password ", hashedPassword);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(`User Created ${user.username}`);
    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
    // res.json({ message: `Registered the user ${user.username}` });
  });
  
  //@desc user login
  //@route GET /api/users/login
  //@access public
  
  const loginUser = asyncHandler(async (req, res) => {
      const { email, password } = req.body;
      if(!email || !password) {
          res.status(400);
          throw new Error("All Fields are mandatory");
  
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
          res.status(200).json({message: "Login Successful",
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
  
  module.exports = { registerUser, loginUser, currentUser };
  