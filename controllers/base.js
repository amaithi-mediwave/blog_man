let today = new Date().toISOString().slice(0, 10)

// console.log(today)



const asyncHandler = require("express-async-handler");


//- Description:    Root
//@route GET : /api/
//@access Public

const getRoot = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Welcome to Blog Man ..!"
    })
});

//- Description:    About
//@route GET : /api/about
//@access Public
const getAbout = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "This is the About Page",
        date: `${today}`,
        description: "You're at the About page of the blog_man Blogging service. Thanks for visiting Blog_man.",
    })
})




module.exports = {
    getRoot,
    getAbout,
}