
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
    app.use("/api/users/", require("./userRoutes"));
    app.use("/api/articles", require("./articlesRoute"));


    //------------------------------------------------------
    //        V2  USER & ARTICLE ROUTES & MULTER - REACT
    //------------------------------------------------------

    app.post("/api/upload/:id", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
    });

    app.post("/api/upload", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
    });

    //------------------------------------------------------
    //          WRONG API ENDPOINT HANDLER [Middleware]
    //------------------------------------------------------
    // app.use('*', require("../middleware/wrongApiEndpointHandler"));


    //------------------------------------------------------
    //          ERROR HANDLER
    //------------------------------------------------------
    app.use(errorHandler);  // Custom Error Handler [Middleware]



}

module.exports = {
    init: init
};



