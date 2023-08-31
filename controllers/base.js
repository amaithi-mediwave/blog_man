const asyncHandler = require("express-async-handler");


//- Description:    Root
//@route GET : /api/
//@access Public

const getRoot = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Welcome to Blog Man ..!"
    })
});






module.exports = {
    getRoot
}