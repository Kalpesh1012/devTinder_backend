const express=require('express');
const profileRouter=express.Router();
const User=require('../models/user');
const { userAuth } = require("../middleware/user");
const { validatorUpdateProfile } = require("../helper/validation");


profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
      const user = req.user;
  
      if (!user) {
        throw new Error("User not found");
      }
      res.send(user);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  profileRouter.patch("/profile",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        const validateFields=validatorUpdateProfile(req);
        console.log(validateFields);
        if(!validateFields){
            throw new Error("Invalid fields");
        }
        const reqBody=req.body;
        const updatedFields=Object.keys(reqBody).reduce((acc,key)=>{
            acc[key]=reqBody[key];
            return acc;
        },{});
        console.log(updatedFields);
        const updatedUser=await User.findByIdAndUpdate(
            user._id,
            updatedFields,
            {new:true}
        )

        res.send({message:"Profile updated successfully",user:updatedUser})
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = profileRouter;