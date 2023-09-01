
const express = require("express");
const router = express.Router();

const { createUserInfo } = require("../controllers/userInfoController")

const validateToken = require("../middleware/validateTokenHandler")




router.use(validateToken);


router.post("/", createUserInfo);
// router.post("/user-info", validateToken, createPost);


module.exports = router;