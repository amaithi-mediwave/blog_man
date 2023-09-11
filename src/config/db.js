const mongoose = require("mongoose");

// The Following Async function will establish the connection between the server and the MongoDB Atlas


const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Connection Established");
        
    } catch (err) {
        console.log(err);   // Gives error if unable to establish the connection
        process.exit(1);
    }
};

module.exports = connectDb;