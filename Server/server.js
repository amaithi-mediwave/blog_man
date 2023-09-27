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




// CONNECTION_STRING = "mongodb+srv://amaithichirasan:admin@amaithi-cluster.lrc1egr.mongodb.net/Blog_man_dev?retryWrites=true&w=majority"
// # CONNECTION_STRING = "mongodb://amaithichirasan:admin@amaithi-cluster.lrc1egr.mongodb.net/Blog_man_dev?retryWrites=true&w=majority"

// ACCESS_TOKEN_SECRET = "g58ga5f6a4h64f6h5a46e4rh8h4th49rwr6eu"
// TOKEN_EXPIRY_MINUTES = "15m"

