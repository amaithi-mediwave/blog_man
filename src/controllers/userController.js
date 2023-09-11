const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {
  userInfoModel,
  userModel
} = require("../models/userModel");


const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, login_after_register } = req.body;

  
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
  const userAvailable = await userModel.findOne({ email });


  if (userAvailable) {
    res.status(400);
    throw new Error("User already Registered");
  }

  // HASH PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("Hashed Password ", hashedPassword);
  const _user = await userModel.create({
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
      res.status(201).json({ message: "User Created and Logged-in Successfully", token });
    } else {
    res.status(201).json({
      message: "User Created Successfully",
    })
  };
    
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//---------------------------------------------------------------


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
  const user = await userModel.findOne({ email });
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

//---------------------------------------------------------------



//@desc current user info
//@route GET /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user_);
});


//---------------------------------------------------------------



// @Desc Token generator funtion


async function token_generator(password, _user) {
  

  // Compare the password and hashed password
  if (_user && (await bcrypt.compare(password, _user.password_hash))) {
    // console.log(_user.password_hash)
    // const matching = await bcrypt.compare(password, _user.password_hash);

    // console.log(matching); //true
    const accessToken = jwt.sign(
      {
        user: {
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

//---------------------------------------------------------------
        //      USER INFO  - CONTROLLERS
//---------------------------------------------------------------

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
  
  const userAvailable = await userInfoModel.findOne({ user_id: req.user.id });
  console.log(userAvailable);
  if (!userAvailable) {
    // Adding user info to the DB
    const user = await userInfoModel.create({
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
      const updatedInfo = await userInfoModel.findOneAndUpdate(
        { user_id: req.user.id },
        {first_name,
          last_name,
          dob: new Date(dob),
          profession,
          interests,
          about},
        { new: true } // -> for retriving the newly updated document from the DB
        
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

//---------------------------------------------------------------


//@desc current user info
//@route GET /api/users/current
//@access private

const currentUserInfo = asyncHandler(async (req, res) => {
  
  const user_info = await userInfoModel.findOne({ user_id: req.user.id });
  
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

//---------------------------------------------------------------




//---------------------------------------------------------------
// Module Export
module.exports = { registerUser, loginUser, currentUser, createUpdateUserInfo, currentUserInfo };



