const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    // mongoose.set('strictQuery', true);
    try {
        mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection;
        db.on('error',(error)=> console.log(error));
        db.once('open',() => console.log('Connected to database'));
        // await mongoose.connect(process.env.MONGO_URI);
        // console.log("connected to database");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}

module.exports = connectDB;