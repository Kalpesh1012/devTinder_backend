    
    const validator=require("validator");
    const validatorSignUp=(req)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName || !email || !password){
        throw new Error("All fields are required");
    }
    if (firstName.length<4 || firstName.length>20){
        throw new Error("First name must be between 4 and 20 characters");
    }
    if (lastName.length<4 || lastName.length>20){
        throw new Error("Last name must be between 4 and 20 characters");
    }
    if (!validator.isEmail(email)){
        throw new Error("Invalid email");
    }
    if (!validator.isStrongPassword(password)){
        throw new Error("Password must be strong");
    }
}

module.exports={validatorSignUp};