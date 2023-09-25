const mongoose = require("mongoose");
// CONNECTION_STRING = "mongodb+srv://amaithichirasan:admin@amaithi-cluster.lrc1egr.mongodb.net/Blog_man_dev?retryWrites=true&w=majority"
//------------------------------------------------------
//          DB CONNECTOR
//------------------------------------------------------

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        // const connect = await mongoose.connect(CONNECTION_STRING);
        console.log("Database Connection Established");

    } catch (err) {
        console.log(err);   // Gives error if unable to establish the connection
        process.exit(1);
    }
};

module.exports = connectDb;