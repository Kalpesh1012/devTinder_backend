const express=require('express');
const authRouter=express.Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');
const { validatorSignUp } = require("../helper/validation");
const { userAuth } = require("../middleware/user");

authRouter.post("/signup", async (req, res) => {
    // console.log(req.body);
    const userObj = new User(req.body);
  
    try {
      validatorSignUp(req);
  
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      userObj.password = hashPassword;
      await userObj.save();
      res.send("User created successfully");
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      console.log(user);
      if (!user) {
        throw new Error("Email is incorrct");
      }
      const isPassWordCorrect = await user.validatePassword(password);
      if (!isPassWordCorrect) {
        throw new Error("Password is incorrect");
      }
      const token = await user.generateAuthToken();
      res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
      res.send("Login successful");
    } catch (error) {
      res.status(404).send(error.message);
    }
  });


  authRouter.post("/logout",async(req,res)=>{
    try{
        res.clearCookie("token");
        res.send("Logout successful");
    }
    catch{
        res.status(404).send(error.message);
    }
  })

module.exports=authRouter;