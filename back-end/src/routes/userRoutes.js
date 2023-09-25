const express = require("express");
const router = express.Router();

const { registerUser,
    loginUser,
    currentUser,
    createUpdateUserInfo,
    currentUserInfo } = require("../controllers/userController")


const validateToken = require("../middleware/validateToken")


//------------------------------------------------------
//         USER ROUTES
//------------------------------------------------------
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);


//------------------------------------------------------
//          USER INFO ROUTES
//------------------------------------------------------
router.post("/user-info", validateToken, createUpdateUserInfo);
router.post("/userinfo/:id", createUpdateUserInfo);

router.get("/user-info", validateToken, currentUserInfo);
router.get("/userinfo/:id", currentUserInfo);



// MODULE EXPORTS
module.exports = router;