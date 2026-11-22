    
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

const validatorUpdateProfile=(req)=>{
    const VALID_FIELDS_TO_UPDATE=[
        "firstName",
        "lastName",
        "gender",
        "profilePicture",
        "skills",
    ]
    console.log(req.body);
    const validateFields=Object.keys(req.body).every(keys=>VALID_FIELDS_TO_UPDATE.includes(keys))
    console.log(validateFields);
    return validateFields;
}

const validatorConnection=(req)=>{
    const VALID_FIELDS=[
        "fromUserID",
        "toUserID",
        "status",
    ]

    const validateFields=Object.keys(req.body).every(keys=>VALID_FIELDS.includes(keys))
    console.log(validateFields)
    return validateFields;
}

module.exports={validatorSignUp,validatorUpdateProfile,validatorConnection};