const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {
  userInfoModel,
  userModel
} = require("../models/userModel");


const jwt = require("jsonwebtoken");
const validator = require("../validators/userValidator")
const {messages} = require("../utils/responseMessages")
const tokenGenerator = require("../utils/tokenGenerator")

const userService = require("../services/userServices")


//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, login_after_register } = req.body;
  
const { error } = validator.validateRegisterUser(username, email, password, login_after_register);
if (error) { res.status(403); throw new Error(`${error}`);};

// const response = await userService.userRegistration(username, email, password, login_after_register);
// if (response.length == 1){
//   res.status(response[0]['statuscode']);
//   res.json(response[0]['message']);
// }
// console.log(response);

  /*
  const userAvailable = await userModel.findOne({ email });


  if (userAvailable) {
    res.status(400);
    throw new Error("User already Registered");
  }

  // HASH PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const _user = await userModel.create({
    username,
    email,
    password_hash: hashedPassword,
  });

  console.log(`User Created ${_user.username}`);

  if (_user) {
    if(login_after_register === "true") {
      
      
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
  */
  const userAvailable = await userService.findUser(email);

  if (userAvailable) { res.status(400); throw new Error(messages.user.mes_1.message); };

  // HASH PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await userService.createUser(username, email, hashedPassword);

  
  if (user) {
    if(login_after_register === "true") {
      
      const token = await tokenGenerator.generateToken(password, user);
      res.status(201).json({ message: messages.user.mes_3.message, token });
    } else {
      res.status(201).json({ message: messages.user.mes_4.message })
  };
    
  } else {
    res.status(400);
    throw new Error(messages.user.mes_2.message);
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
  
  const { error } = validator.validateLoginUser(email, password);
if (error) { res.status(403); throw new Error(`${error}`);}

  const user = await userService.findUser(email);
  if (!user) { res.status(400); throw new Error(messages.user.mes_6.message); };

  const accessToken = await tokenGenerator.generateToken(password, user);

  if (accessToken) {
    res.status(200).json({message: messages.user.mes_5.message, accessToken })
  }
  else {
    res.status(401); throw new Error(messages.user.mes_7.message);
  }
});

//   // Compare the password and hashed password
//   if(user && (await bcrypt.compare(password, user.password_hash))){
    
//       const accessToken = jwt.sign({
//           user: {
//               username: user.username,
//               email: user.email,
//               id: user.id,
//           },
//       }, process.env.ACCESS_TOKEN_SECRET, {
//           expiresIn: "15m"
//       });
//       res.status(200).json({message: "Login Successful",
//           accessToken 
//       });
//   }else {
//       res.status(401)
//       throw new Error("email or password is not valid");
//   }
// });


/*  -- WORKING FINE -- 
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const { error } = validator.validateLoginUser(email, password);
if (error) { res.status(403); throw new Error(`${error}`);}

  const user = await userService.findUser(email);

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
*/


//---------------------------------------------------------------



//@desc current user info
//@route GET /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});


//---------------------------------------------------------------



// @Desc Token generator funtion

/*
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
*/

//---------------------------------------------------------------
//              USER INFO  - CONTROLLERS
//---------------------------------------------------------------

//@desc Create User info
//@route POST /api/users/user-info
//@access private

const createUpdateUserInfo = asyncHandler(async (req, res) => {
  const { first_name, last_name, dob, profession, interests, about } = req.body;

  

  const { error } = validator.validateUserInfo(first_name, last_name, dob, profession, interests, about);
  if (error) {res.status(403); throw new Error(`${error}`);};

  let date = new Date(dob)
  let dat = date.toISOString()
  
  const userInfoAvailable = await userService.findUserInfo(req.user.id);

  if (!userInfoAvailable) {
    userInfo = await userService.createUserInfo(req.user.id, first_name, last_name, dob, profession, interests,  about);


    if (userInfo) {res.status(201).json({User_Info_created: {
          name: `${userInfo.first_name} ${userInfo.last_name}`,
          dob: userInfo.dob,
          profession: userInfo.profession,
          interests: userInfo.interests,
          about: userInfo.about,
        },
      });
    }
  } else {
    try {
      const updatedInfo = await userService.updateUserInfo(req.user.id, first_name, last_name, dat, profession, interests,  about);
      res.status(200).json({
        updated_info: {
          name: `${updatedInfo.first_name} ${updatedInfo.last_name}`,
          dob: updatedInfo.dob,
          profession: updatedInfo.profession,
          interests: updatedInfo.interests,
          about: updatedInfo.about}});
    } catch {
      res.status(400);
      throw new Error(messages.user.mes_2);
    }
  }
});


/*

  // const userAvailable = await userInfoModel.findOne({ user_id: req.user.id });
  
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
*/

/*
const createUpdateUserInfo = asyncHandler(async (req, res) => {
  const { first_name, last_name, dob, profession, interests, about } = req.body;

  

  const { error } = validator.validateUserInfo(first_name, last_name, dob, profession, interests, about);
  if (error) {res.status(403); throw new Error(`${error}`);};

  let date = new Date(dob)
  let dat = date.toISOString()
  
  const userAvailable = await userInfoModel.findOne({ user_id: req.user.id });
  
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
*/

//---------------------------------------------------------------


//@desc current user info
//@route GET /api/users/current
//@access private

const currentUserInfo = asyncHandler(async (req, res) => {
  
  const userInfo = await userService.findUserInfo(req.user.id);
  
  if(!userInfo) { 
    res.status(204); throw new Error(messages.user.mes_8);
    
  } else {
    res.status(200).json({
     User_Info: {
        name: `${userInfo.first_name} ${userInfo.last_name}`,
        dob: userInfo.dob,
        profession: userInfo.profession,
        interests: userInfo.interests,
        about: userInfo.about,
      },
    });
  }
});

//---------------------------------------------------------------




//---------------------------------------------------------------
// Module Export
module.exports = { registerUser, loginUser, currentUser, createUpdateUserInfo, currentUserInfo };



