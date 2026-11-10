const mongoose = require("mongoose");
require("dotenv").config();

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("MongoDB connected");
    }catch(error){
        console.log(error);
    }
}

module.exports = connectDB;









//mongoose.connect always returns a promise that's why we need to use await to connect to the database