const { userInfoModel, userModel, } = require("../models/userModel");



//------------------------------------------------------
//          FIND THE USER
//------------------------------------------------------
const findUser = async(email) => {
  const user = await userModel.findOne({ email });
  return user
}

//------------------------------------------------------
//          CREATE USER
//------------------------------------------------------
const createUser = async(username, email, hashedPassword) => {
  const user = await userModel.create({username, email, password_hash: hashedPassword,});
  return user
}

//------------------------------------------------------
//          FIND USER INFO
//------------------------------------------------------
const findUserInfo = async(id) => {
  const userInfo = await userInfoModel.findOne({ user_id: id });
  return userInfo
}

//------------------------------------------------------
//          CREATE USER INFO
//------------------------------------------------------
const createUserInfo = async(id, first_name, last_name, dob, profession, interests, about) => {
  const userInfo = await userInfoModel.create({ user_id: id, first_name, last_name, dob, profession, interests, about });
  return userInfo
}

//------------------------------------------------------
//          UPDATE USER INFO
//------------------------------------------------------
const updateUserInfo = async(id, first_name, last_name, dob, profession, interests, about) => {
  const userInfo = await userInfoModel.findOneAndUpdate(
    { user_id: id },
    {first_name,
      last_name,
      dob: new Date(dob),
      profession,
      interests,
      about},
    { new: true });  // -> for retriving the newly updated document from the DB
  return userInfo
}



// MODULE EXPORTS

module.exports = {
                  findUser, 
                  createUser, 

                  findUserInfo,
                  createUserInfo,
                  updateUserInfo
                
                }

