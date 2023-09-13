const express = require("express");
const router = express.Router();


//------------------------------------------------------
//          WRONG API ENDPOINT ROUTE & HANDLER
//------------------------------------------------------
router.route("/")
            .get(endPointHandler)
            .post(endPointHandler)
            .put(endPointHandler)
            .delete(endPointHandler);



function endPointHandler (req, res) {
    res.status(400);
    throw new Error("Wrong API Endpoint")
}

module.exports = router;