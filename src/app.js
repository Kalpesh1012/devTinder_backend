const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const {validatorSignUp}=require("./helper/validation");
const bcrypt=require("bcrypt");

console.log("app.js loaded",User.modelName);


// app.get("/test", (req, res) => res.send("working"));

app.use(express.json()); // middleware to parse the body of the request

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


app.get("/user",async (req,res)=>{
    const user=await User.findOne({email:req.body.email});     //findOne is a method to find a single document in the database
    if(!user){
        return res.status(404).send("User not found");
    }
    try{
        res.send(user);
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }







    // const users=await User.find({email:req.body.email});    //find is a method to find multiple documents in the database
    // console.log(users,req.body.email);
    // if(users.length===0){
    //     return res.status(404).send("User not found");
    // }
    // try{
    //     res.send(users);
    // }
    // catch(error){
    //     res.status(500).send("Internal Server Error");
    // }
})


app.get("/user/id", async (req, res) => {
    try {
      const { id } = req.params;


  
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

app.get("/feed",async(req,res)=>{
    const users=await User.find({});
    try{
        res.send(users);
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }
})

app.delete("/user/:id",async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(404).send("User not found");
    }
    try{
        res.send(user);
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }
});

app.patch("/user/:id", async(req,res)=>{
    const id=req.params.id;

    
    const updatedData=req.body;
    const user = await User.findByIdAndUpdate(id,updatedData,{new:true,runValidators:true});
    console.log(user);
    if(!user){
        return res.status(404).send("User not found");
    }
    try{
        const ALLOWED_FIELDS = [ "name", "gender", "about"];

        const FIELD_UPDATES= Object.keys(req.body).every(filed=>ALLOWED_FIELDS.includes(filed));
  
      console.log(FIELD_UPDATES);
  
        if(!FIELD_UPDATES){
          throw new Error("Invalid fields");
        }
        else{
            res.send(user);
        }
    }
    catch(error){
        res.status(400).send(error.message);
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
