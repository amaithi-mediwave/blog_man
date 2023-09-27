


const mongoose = require("mongoose");



//------------------------------------------------------
//          DB CONNECTOR
//------------------------------------------------------

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);      // Try to Establish connection to mongoDb Atlas
        
        console.log("Database Connection Established");

    } catch (err) {
        console.log(err);                                                            // Gives error if unable to establish the connection
        process.exit(1);
    }
};

module.exports = connectDb;