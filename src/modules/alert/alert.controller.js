import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import ApiFeature from "../../utils/services/ApiFeatures.js";
import alertModel from "../../../database/models/alert.model.js"
import deleteOne from "../../utils/handler/refactor.handler.js";

export const createAlert = catchAsyncError(async(req,res,next)=>{
    req.body.owner = req.user._id
    let result = await alertModel.create(req.body);
    res.json({message:"done",result});
})

export const getAllAlerts = catchAsyncError(async(req,res,next)=>{
    let apiFeature= new ApiFeature(alertModel.find().populate("assignedTo","name , _id"),req.query).pagination().filter().sort().search().fields()
    let result = await apiFeature.mongooseQuery
    res.json({message:"done",result});
})

export const deleteRequest = deleteOne(alertModel)