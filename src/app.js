const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

console.log("app.js loaded",User.modelName);


app.get("/test", (req, res) => res.send("working"));

app.post("/signup", async (req,res)=>{
    console.log("signup route hit");
    const userObj=new User({
        firstName:"kalpesh",
        lastName:"mahale",
        email:"kalpesh@gmail.com",
        password:"123456",
        email:"kalpesh@gmail.com",
        age:20,
        phoneNumber:"1234567890",
    });

    try{
        await userObj.save();
        res.send("User created successfully");
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }
})

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
