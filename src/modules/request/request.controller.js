import moment from "moment";
import requestModel from "../../../database/models/request.model.js";
import deleteOne from "../../utils/handler/refactor.handler.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import ApiFeature from "../../utils/services/ApiFeatures.js";

export const createRequest = catchAsyncError(async(req,res,next)=>{
    req.body.owner = req.user._id;
    req.body.startDate = new Date(req.body.startDate); 
    req.body.endDate = new Date(req.body.endDate);
   // Calculate duration in days using Moment.js
  const durationInDays = moment.duration(req.body.endDate - req.body.startDate).asDays();
  // Ensure non-negative duration (optional)
  req.body.duration = Math.max(0, durationInDays); // Handles cases where endDate < startDate
    let result = await requestModel.create(req.body);
    res.json({message:"done",result});
})

export const getRequests = catchAsyncError(async(req,res,next)=>{
    let apiFeature= new ApiFeature(requestModel.find().populate("owner","name , id"),req.query).pagination().filter().sort().search().fields()
    let result = await apiFeature.mongooseQuery
    res.json({message:"done",result});
})

export const getRequestById = catchAsyncError(async(req,res,next)=>{
    let {id} = req.params;
    let result = await requestModel.findById(id)
    res.json({message:"done",result});
})

export const editRequest = catchAsyncError(async(req,res,next)=>{
    let {id} = req.params;
    req.body.startDate = new Date(req.body.startDate); 
    req.body.endDate = new Date(req.body.endDate);
    const durationInDays = moment.duration(req.body.endDate - req.body.startDate).asDays();
    req.body.duration = Math.max(0, durationInDays); 
    
    let result = await requestModel.findOneAndUpdate({_id:id ,owner:req.user._id},req.body,{new:true});
    res.json({message:"done",result});
})

export const deleteRequest = deleteOne(requestModel)
