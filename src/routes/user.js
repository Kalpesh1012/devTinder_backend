const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const connectionRequest = require('../models/connectionRequest');
const { userAuth } = require('../middleware/user');

userRouter.get("/user/request", userAuth, async (req, res) => {
    try {
        const loggoedInUser = req.user
        const interstedRequest = await connectionRequest.find({
            toUserID: loggoedInUser,
            status: "interested"
        }).populate("fromUserID", "firstName lastName profilePicture age gender about");
        if (interstedRequest.length <= 0) {
            return res.status(200).json({ message: "No Request Found" })
        }
        console.log(`interstedRequest`)
        res.status(200).send({ message: "Request Fetch succesfully", data: interstedRequest })
    }
    catch (err) {
        res.status(400).send(`Err: ${err}`)
    }
})

userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {
        const user = req.user
        const page = req.query.page || 1;
        let limit = req.query.limit || 10;
        limit > 100 ? 100 : limit;
        const skip = (page - 1) * limit

        const hideUserFromFeed = await connectionRequest.find({
            $or: [{ fromUserID: user._id }, { toUserID: user.id }]
        })
        const mySet = new Set();
        hideUserFromFeed.forEach(user => {
            mySet.add(user.fromUserID.toString()) // convert obj to string
            mySet.add(user.toUserID.toString())
        })
        const users = await User.find({
            $and: [{ _id: { $ne: user._id } }, { _id: { $nin: Array.from(mySet) } }]
        }).select("firstName lastName gender about age profilePicture skills").skip(skip).limit(limit)
        res.send({ users })
    }
    catch (err) {
        res.status(400).json({ message: `Error ${err}` })
    }
})


module.exports = userRouter;