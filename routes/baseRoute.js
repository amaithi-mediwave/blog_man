const express = require("express");
const router = express.Router();

const {
    getRoot,
} = require("../controllers/base");

router.route("/").get(getRoot)

module.exports = router;