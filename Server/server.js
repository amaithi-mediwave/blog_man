const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDb = require("./src/config/db");

const path = require("path");
let routes = require("./src/routes")

const port = process.env.PORT || 5000;        // Assign PORT for Server listening either get from .env or it'll take 5000



connectDb();              // - Connect Server to MongoDb Atlas

const app = express();    // - Creating Express Instance

app.use(express.json());  // - JSON Parser
app.use(cors());          // - CORS Handler 

routes.init(app);         // - Initializing Routes(index)


app.use("/images/", express.static(path.join(__dirname, "/images")));       //- Binding Images Folder for Storage


app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);                          //- Server
});




