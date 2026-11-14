const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const {validatorSignUp}=require("./helper/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middleware/user");

console.log("app.js loaded",User.modelName);


// app.get("/test", (req, res) => res.send("working"));

app.use(express.json()); // middleware to parse the body of the request
app.use(cookieParser()); // middleware to parse the cookies of the request
app.post("/signup", async (req,res)=>{


    
    // console.log(req.body);
    const userObj=new User(req.body);
    

    try{
        validatorSignUp(req);

        const hashPassword=await bcrypt.hash(req.body.password,10);
        userObj.password=hashPassword;
        await userObj.save();
        res.send("User created successfully");
    }
    catch(error){
        res.status(404).send(error.message);
    }
})


app.post("/login",async(req,res)=>{

    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        console.log(user);
        if(!user){
            throw new Error("Email is incorrct")
        }
        const isPassWordCorrect=await user.validatePassword(password);
        if(!isPassWordCorrect){
            throw new Error("Password is incorrect")
        }
        const token =await user.generateAuthToken();
        res.cookie("token",token,{expires:new Date(Date.now()+1000*60)});
        res.send("Login successful");
    }
    catch(error){
        res.status(404).send(error.message);
    }
})


app.get("/profile",userAuth,async(req,res)=>{
    try{
       
        const user=req.user;

        if(!user){
            throw new Error("User not found");
        }
        res.send(user);
    }
    catch(error){
        res.status(404).send(error.message);
    }
})

app.post("/sendconnectionrequest",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        console.log(user);
        res.send(`Connection request send by ${user.firstName}`);
    }
    catch(error){
        res.status(404).send(error.message);
    }
});

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
