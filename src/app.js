const express = require("express");
const {adminAuth, userAuth} = require("./middleware/adminAuth");
const app = express();




//handle all http methods

// app.use("/",(req,res)=>{
//     res.send("Main Hi");
//  })


//ERROR HANDLING MIDDLEWARE

app.use("/",(req,res,next)=>{
    console.log("First Error Middleware");
    // if(err){
    //     res.status(500).send("Internal Server Error");
    // }
})

app.get("/userData",(req,res,next)=>{
    console.log("User Data");
    throw new Error("User Data Error");
})

app.use("/",(err,req,res,next)=>{
    console.log("second Error Middleware");
    if(err){
        res.status(500).send("Internal Server Error");
    }
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});


/*
Top    -> normal middleware (json parser, auth, logger)
Middle -> routes
Bottom -> error handler */