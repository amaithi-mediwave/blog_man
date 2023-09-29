const express = require("express");
const router = express.Router();


const validateToken = require("../middleware/validateToken");

let control = require("../controllers/index");


//------------------------------------------------------
//         USER ROUTES
//------------------------------------------------------
router.post("/register", control.User.registerUser);
router.post("/login", control.User.loginUser);

router.get("/current", validateToken, control.User.currentUser);


//------------------------------------------------------
//          USER INFO ROUTES
//------------------------------------------------------
router.post("/user-info", validateToken, control.User.createUpdateUserInfo);
router.get("/user-info", validateToken, control.User.currentUserInfo);

// - Non - Token User Info Route
router.get("/userinfo/:id", control.User.currentUserInfo);
router.post("/userinfo/:id", control.User.createUpdateUserInfo);



// MODULE EXPORTS
module.exports = router;