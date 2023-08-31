const express = require("express");
const router = express.Router();

const {
    getRoot,
    getAbout,
} = require("../controllers/base");

router.route("/").get(getRoot)
router.route("/about").get(getAbout)

module.exports = router;