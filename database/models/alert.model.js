import mongoose, { Types } from "mongoose";

const alertSchema  = new mongoose.Schema({
title:{
    type:String,
    required:true,
    trim:true,
    minLength:[5,"Too short alert title"]
},
description:{
    type:String,
    required:true,
    trim:true,
    minlength:[10,"Too short description"]
},
owner:{
    type:Types.ObjectId,
    required:true,
    ref:"Employee"
},
assignedTo:{
    type:Types.ObjectId,
    ref:"Employee"
}
},{timestamps:true})


const alertModel = mongoose.model("Alert",alertSchema);

export default alertModel;