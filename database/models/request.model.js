import mongoose from "mongoose";
const requestSchema = new  mongoose.Schema({
    status:{
        type:String,
        enum:["bending","accepted","rejected"],
        default:"bending"
     },
     startDate:{
        type:Date, 
     },
     endDate:{
        type:Date,
    },
    duration:{
        type:String,
    },
    reason:{
        type:String,
        required:[true,"reason is required"],
        enum:["sick","vacation","personal","other"],
    },
    description:{
        type:String,
        maxLength:100,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"Employee"
      },
    file:{
        type:String,
    },
}, {timestamps: true});


const requestModel = mongoose.model("Request", requestSchema);
export default requestModel;