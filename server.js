const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require("./src/middleware/errorHandler");
const cors = require('cors');
const connectDb = require("./src/config/db");

let routes = require("./src/routes")

connectDb();

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;  // Assign PORT for Server listening

app.use(express.json());    // JSON parser

routes.init(app);

// //------------------------------------------------------
// //          BASE ROUTES
// //------------------------------------------------------
// app.use("/api/", require("./src/routes/baseRoute"));

// //------------------------------------------------------
// //          USER ROUTES
// //------------------------------------------------------
// app.use("/api/users/", require("./src/routes/userRoutes"));

// //------------------------------------------------------
// //          ARTICLE ROUTES
// //------------------------------------------------------
// app.use("/api/articles", require("./src/routes/articlesRoute"));


// //------------------------------------------------------
// //          WRONG API ENDPOINT HANDLER [Middleware]
// //------------------------------------------------------
// app.use('*', require("./src/middleware/wrongApiEndpointHandler"));


// //------------------------------------------------------
// //          ERROR HANDLER
// //------------------------------------------------------
// app.use(errorHandler);  // Custom Error Handler [Middleware]



// Server 

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});