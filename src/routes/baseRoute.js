const express = require("express");
const router = express.Router();

const {
    getRoot,
    getAbout,
} = require("../controllers/base");



//------------------------------------------------------
//          BASE ROUTES
//------------------------------------------------------
router.route("/").get(getRoot)
router.route("/about").get(getAbout)


// MODULE EXPORTS
module.exports = router;