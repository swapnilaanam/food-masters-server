const mongoose = require('mongoose');

const mongo_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fuichu5.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        await mongoose.connect(mongo_uri, { dbName: "foodMastersDB" });
        console.log("Connected To MongoDB Successfully...");
    } catch (error) {
        console.log(error);
        throw new Error("Database Connection Failed!");
    }
};

module.exports = connectDB;