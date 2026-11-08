const express = require("express");
const app = express();




//handle all http methods

// app.use("/",(req,res)=>{
//     res.send("Main Hi");
//  })

 app.get("/user",(req,res)=>{
    res.send({firstName:"Kalpesh",lastName:"Mahale"})
 })

 app.post("/user",(req,res)=>{
    res.send("Data post succesfully")
 })

 app.delete("/user",(req,res)=>{
    res.send("Data Deleted Sucesfully")
 })

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});