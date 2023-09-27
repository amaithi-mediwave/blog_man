const express = require("express");
const router = express.Router();


const validateToken = require("../../middleware/validateToken");

let control = require("../../controllers/index");


//------------------------------------------------------
//         USER ROUTES
//------------------------------------------------------
router.post("/register", control.v1_user.registerUser);
router.post("/login", control.v1_user.loginUser);
router.get("/current", validateToken, control.v1_user.currentUser);


//------------------------------------------------------
//          USER INFO ROUTES
//------------------------------------------------------
router.post("/user-info", validateToken, control.v1_user.createUpdateUserInfo);
router.get("/user-info", validateToken, control.v1_user.currentUserInfo);




// MODULE EXPORTS
module.exports = router;