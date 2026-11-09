const adminAuth= (req,res,next)=>{
    console.log("admin middleware");
    let token="Kalpesh";
    let isAuthenticated=token==='Kalpesh';
    if(!isAuthenticated){
        res.status(401).send("Unauthorized");
    }
    next();
}

const userAuth= (req,res,next)=>{
    console.log("user middleware");
    let token="1234";
    let isAuthenticated=token==='123S4';
    if(!isAuthenticated){
        res.status(401).send("Unauthorized");
    }
    next();
}



module.exports={
    adminAuth,
    userAuth
};