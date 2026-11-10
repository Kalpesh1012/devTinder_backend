const express = require("express");
const app = express();
const connectDB = require("./config/database");

const startServer=async()=>{
    try{
        await connectDB();
        app.listen(3000,()=>{
            console.log("Server is running on port 3000");
        });
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

startServer();


/*
Top    -> normal middleware (json parser, auth, logger)
Middle -> routes
Bottom -> error handler

always start the server after the database is connected

*/
