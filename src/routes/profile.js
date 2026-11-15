const express=require('express');
const profileRouter=express.Router();
const User=require('../models/user');
const { userAuth } = require("../middleware/user");


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

module.exports=profileRouter;