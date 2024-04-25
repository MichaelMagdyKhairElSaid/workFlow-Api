import mongoose, { Types } from "mongoose";

const notificationSchema  = new mongoose.Schema({
title:{
    type:String,
    required:true,
    trim:true,
    minLength:[5,"Too short notification title"]
},
description:{
    type:String,
    required:true,
    trim:true,
    minlength:[10,"Too short description"]
},
owner:{
    type:Types.ObjectId,
    ref:"Employee",
    required:true
}
},{timestamps:true})


const notificationModel = mongoose.model("Notification",notificationSchema);

export default notificationModel;