const mongoose = require("mongoose");

const connectRequestSchema = new mongoose.Schema({
    fromUserID: {
       type: mongoose.Schema.Types.ObjectId,
       require:true, //To take user id from mongodb
    },
    toUserID: {
        type: mongoose.Schema.Types.ObjectId,
        require:true, //To take user id from mongodb
     },
     status:{
        type:String,
        require:true,
        enum:["ignored","interested",'accepted',"rejected"]
     }
},
{timestamps:true},
)

connectRequestSchema.index({fromUserID:1,toUserID:1});

connectRequestSchema.pre("save",function(){
    const connectionRequest=this;
    if(connectionRequest.fromUserID.equals(connectionRequest.toUserID)){
        throw new Error("Cannot send a connection request to yourself!")
    }
})

const connectionRequest = mongoose.model("connectionRequest",connectRequestSchema)
module.exports=connectionRequest