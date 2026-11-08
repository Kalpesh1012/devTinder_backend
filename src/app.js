const express = require("express");
const app = express();

app.use((req,res)=>{
    console.log("Request received");
    res.send("Hello Worldss");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});