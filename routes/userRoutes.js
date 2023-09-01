const express = require("express");
const router = express.Router();

const { registerUser, loginUser, currentUser } = require("../controllers/userController")
const { createUserInfo } = require("../controllers/userInfoController")

const validateToken = require("../middleware/validateTokenHandler")



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);



module.exports = router;