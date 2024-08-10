const mongoose = require("mongoose");

const connectionDB = async () => {
    const dbUrl = process.env.DB_URL;
    try {
        await mongoose.connect(dbUrl);
        console.log(`Server is connected to Database`);
    } catch (e) {
        console.log(`Server Database connection error ${e}`);
        process.exit(1);
    }
};

module.exports = connectionDB;
