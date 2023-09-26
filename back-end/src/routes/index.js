// 'use strict';


const errorHandler = require("../middleware/errorHandler");

function init(app) {

    //------------------------------------------------------
    //          BASE ROUTES
    //------------------------------------------------------
    app.use("/api/", require("./baseRoute"));

    //------------------------------------------------------
    //        V1  USER & ARTICLE ROUTES - REST API
    //------------------------------------------------------
    app.use("/api/users/", require("./v1/userRoutes"));
    app.use("/api/articles", require("./v1/articlesRoute"));


    //------------------------------------------------------
    //        V2  USER & ARTICLE ROUTES - REACT
    //------------------------------------------------------

    app.use("/api/v2/users", require("./v2/userRoutes"));
    app.use("/api/v2/articles", require("./v2/articlesRoute"));

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