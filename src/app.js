const express = require("express");
const app = express();




//handle all http methods

// app.use("/",(req,res)=>{
//     res.send("Main Hi");
//  })

 app.get("/user",(req,res,next)=>{
    console.log("1st handler call")
    next();
    // res.send("1st response")
 },
(req,res,next)=>{
    console.log("2nd handler call");
    // res.send("2nd response")
    next();
},
(req,res,next)=>{
    console.log("3nd handler call");
    // res.send("3rd response")
    next();
},
(req,res,next)=>{
    console.log("4rth handler call");
    // res.send("4th response")
    next();
},
(req,res,next)=>{
    console.log("5th handler call");
    res.send("5th response")
}

)


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});