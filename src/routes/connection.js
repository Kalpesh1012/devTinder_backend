const express=require('express');
const connectionRouter=express.Router();
const { userAuth } = require("../middleware/user");

connectionRouter.post("/sendconnectionrequest", userAuth, async (req, res) => {
    try {
      const user = req.user;
      console.log(user);
      res.send(`Connection request send by ${user.firstName}`);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });