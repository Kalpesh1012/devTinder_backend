const express = require("express");
const {adminAuth, userAuth} = require("./middleware/adminAuth");
const app = express();




//handle all http methods

// app.use("/",(req,res)=>{
//     res.send("Main Hi");
//  })


//Now admin api will work only when we know he is authenticated so we don't write the logic of authencated in each method


app.use("/admin",adminAuth)

app.get("/admin/data",(req,res)=>{
    console.log("admin data");
    res.send("admin data");
})

app.post("/admin/data",(req,res)=>{
    console.log("admin data");
    res.send("Post admin data");
})

app.get("/user/data",userAuth,(req,res)=>{
    console.log("user data");
    res.send("user data");
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});