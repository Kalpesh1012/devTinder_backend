const express=require('express');
const connectionRouter=express.Router();
const { userAuth } = require("../middleware/user");
const connectionRequest=require('../models/connectionRequest');
const { validatorConnection } = require("../helper/validation");
const User=require('../models/user');

connectionRouter.post("/request/send/:status/:toUserID", userAuth, async (req, res) => {
    try {
      // const validFields= validatorConnection(req)/
      const status=req.params.status;
      const toUserID=req.params.toUserID;
      const user=req.user
      const fromUserID =user._id


      const ALLOWED_STATUS=["interested","ignored"];

      //Status Validation

      const is_status_allowed=ALLOWED_STATUS.includes(status);
      if(!is_status_allowed){
        return res.json({message:`Status ${status} is invalid`})
      }
    
      //tuUserID is a valid Id/User in Db or not

      const isToUserIDExist= await User.findOne({
        _id:toUserID
      })

      console.log(isToUserIDExist)

      if(!isToUserIDExist){
        return res.json({message:"Invalid User"})
      }
      // IF User A is Requested User B then User B Can't set intersted or Ignored User A or vice versa

      const existingConnectionRequest=await connectionRequest.findOne({
        $or: [{fromUserID:fromUserID,toUserID:toUserID},{toUserID:fromUserID,fromUserID:toUserID}]
       })
      console.log(existingConnectionRequest)
      
      if(existingConnectionRequest){
        return res.json({message:"User already send a request"})
      }

      //User A can't send the request to itself 

      console.log(fromUserID===user._id)

      //Use Pre function in schema
      // if(fromUserID===user._id){
      //   return res.json({message:"You can't send a request to yourself"})
      // }



      
     
      const connectionObj = new connectionRequest({
        fromUserID,
        toUserID,
        status,
      });
  
      await connectionObj.save();
    
      res.json(`Request "${status}" sent to ${toUserID}`);

    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  module.exports = connectionRouter;