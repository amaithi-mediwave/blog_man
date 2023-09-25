const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



//------------------------------------------------------
//          JWT TOKEN GENERATOR
//------------------------------------------------------

async function generateToken(password, user) {


  // Compare the password and hashed password
  if (await bcrypt.compare(password, user.password_hash)) {

    return true

    // const accessToken = jwt.sign(
    //   {
    //     user: {
    //       username: user.username,
    //       email: user.email,
    //       id: user.id,
    //     },
    //   },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   {
    //     expiresIn: process.env.TOKEN_EXPIRY_MINUTES,
    //   }
    // );
    // return accessToken;
  }
}

module.exports = { generateToken }