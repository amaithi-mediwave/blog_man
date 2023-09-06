const mongoose = require("mongoose");

const connect_Db = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "Database Connection Established",
            
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connect_Db;