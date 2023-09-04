
const express = require("express");
const router = express.Router();

const { createUpdateUserInfo, currentUserInfo } = require("../controllers/userInfoController")

const validateToken = require("../middleware/validateTokenHandler")




router.use(validateToken);


router.post("/user-info", createUpdateUserInfo);

router.get("/user-info", currentUserInfo);



module.exports = router;