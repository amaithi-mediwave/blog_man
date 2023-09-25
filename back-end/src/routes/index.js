// 'use strict';


const errorHandler = require("../middleware/errorHandler");

function init(app) {

    //------------------------------------------------------
    //          BASE ROUTES
    //------------------------------------------------------
    app.use("/api/", require("./baseRoute"));

    //------------------------------------------------------
    //          USER ROUTES
    //------------------------------------------------------
    app.use("/api/users/", require("./userRoutes"));

    //------------------------------------------------------
    //          ARTICLE ROUTES
    //------------------------------------------------------
    app.use("/api/articles", require("./articlesRoute"));


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