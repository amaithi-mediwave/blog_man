const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require("./src/middleware/errorHandler");
const cors = require('cors');
const connectDb = require("./src/config/db");
const multer = require("multer");
const path = require("path");



let routes = require("./src/routes")

connectDb();

const app = express();

app.use(cors());


app.use("/images/", express.static(path.join(__dirname, "/images")));




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
// console.log(__dirname);

const upload = multer({ storage: storage });


app.post("/api/upload/:id", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});



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