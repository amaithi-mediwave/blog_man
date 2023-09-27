
const upload = require("../middleware/multerFileHandler")               //- File Handler Middleware

const errorHandler = require("../middleware/errorHandler");             //- Custom Error Handler




function init(app) {

    //------------------------------------------------------
    //          BASE ROUTES
    //------------------------------------------------------
    app.use("/api/", require("./baseRoute"));

    //------------------------------------------------------
    //        V1  USER & ARTICLE ROUTES - REST API
    //------------------------------------------------------
    app.use("/api/users/", require("./v2/userRoutes"));
    app.use("/api/articles", require("./v1/articlesRoute"));


    //------------------------------------------------------
    //        V2  USER & ARTICLE ROUTES & MULTER - REACT
    //------------------------------------------------------

    app.use("/api/v2/users", require("./v2/userRoutes"));
    app.use("/api/v2/articles", require("./v2/articlesRoute"));

    //          FILE HANDLER

    app.post("/api/v2/upload/:id", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
    });

    app.post("/api/v2/upload", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
    });

    //------------------------------------------------------
    //          WRONG API ENDPOINT HANDLER [Middleware]
    //------------------------------------------------------
    // app.use('*', require("../middleware/wrongApiEndpointHandler"));

    //------------------------------------------------------
    //          ERROR HANDLER
    //------------------------------------------------------
    // app.use(errorHandler);  // Custom Error Handler [Middleware]



}

module.exports = {
    init: init
};