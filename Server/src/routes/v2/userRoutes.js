const express = require("express");
const router = express.Router();



let control = require("../../controllers/index");



const verifier = (req, res, next) => {
  
    const token = req.header("v2_header");
    if (token == 'web') {
        console.log('working fine')
    } else {
        console.log('not working')
    }
    // append the user object the the request object
  

    // call next middleware in the stack
    next();
  };


//------------------------------------------------------
//         USER ROUTES
//------------------------------------------------------
router.post("/register", control.v2_user.registerUser);
// router.post("/login", control.v2_user.loginUser);

router.post("/login", verifier);



//------------------------------------------------------
//          USER INFO ROUTES
//------------------------------------------------------
router.get("/userinfo/:id", control.v2_user.currentUserInfo);
router.post("/userinfo/:id", control.v2_user.createUpdateUserInfo);



// MODULE EXPORTS
module.exports = router;