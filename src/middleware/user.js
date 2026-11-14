const jwt=require("jsonwebtoken");
const User=require("../models/user");
const userAuth= async(req,res,next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("Unauthorized");
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const {_id}=decoded;
    const user=await User.findById(_id);
    if(!user){
        throw new Error("Unauthorized Please Login Again");
    }
    req.user=user;
    next();
}
catch(error){
    res.status(401).send(error.message);
}
}



module.exports={
    userAuth
};