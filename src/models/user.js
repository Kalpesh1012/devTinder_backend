const mongoose = require("mongoose");
const validator = require("validator");
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:40,
        trim:true,

    },
    lastName:{
        type:String,
        minlength:3,
        maxlength:40,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3,
        maxlength:40,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email");
            }
        },
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:40,
        trim:true,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Invalid gender");
            }
        },
        trim:true,
    },
    about:{
        type:String,
        trim:true,
        default:"Hi I'm a developer",
        minlength:10,
        maxlength:200,
    },
   age:{
    type:Number,
    min:10,
    max:100,
   },
   phoneNumber:{
    type:String,
    minlength:10,
    maxlength:15,
    trim:true,
   }
},{timestamps:true})

const User = mongoose.model("User", userSchema);

module.exports = User;