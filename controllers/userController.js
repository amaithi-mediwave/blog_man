const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, login_after_register } = req.body;

  // console.log(username, email, login_after_register);

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });

  // console.log(userAvailable);

  if (userAvailable) {
    res.status(400);
    throw new Error("User already Registered");
  }

  // HASH PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("Hashed Password ", hashedPassword);
  const _user = await User.create({
    username,
    email,
    password_hash: hashedPassword,
  });

  console.log(`User Created ${_user.username}`);

  if (_user) {
    if(login_after_register === "true") {
      // console.log("login after register check");
      // const user = await User.findOne({ email });
      // const token_secret = process.env.ACCESS_TOKEN_SECRET;
      
      const token = await token_generator(password, _user);
      // console.log(token);
      res.status(201).json({ message: "User Created and Loggedin Successfully", token });
    } else {
    res.status(201).json({
      message: "User Created Successfully",
    })
  };
    
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  // res.json({ message: `Registered the user ${user.username}` });
});


//@desc user login
//@route GET /api/users/login
//@access public

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.status(400);
//     throw new Error("All Fields are mandatory");
//   } 
//   const _user = await User.findOne({ email });

//   if(_user) {      
//     // console.log(_user);
//       const token = token_generator(password, _user);
//       res.status(200).json({ message: "Login Successful", token });
//     } else {
//       res.status(401);
//       throw new Error("email or password is not valid");
//     }
//   }
// );


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) {
      res.status(400);
      throw new Error("All Fields are mandatory");

  }
  const user = await User.findOne({ email });
  // Compare the password and hashed password
  if(user && (await bcrypt.compare(password, user.password_hash))){
    
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


// @Desc Token generator funtion


async function token_generator(password, _user) {
  

  // Compare the password and hashed password
  if (_user && (await bcrypt.compare(password, _user.password_hash))) {
    // console.log(_user.password_hash)
    // const matching = await bcrypt.compare(password, _user.password_hash);

    // console.log(matching); //true
    const accessToken = jwt.sign(
      {
        user_: {
          username: _user.username,
          email: _user.email,
          id: _user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    return accessToken;
  }
}

module.exports = { registerUser, loginUser, currentUser };
