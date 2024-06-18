import moment from "moment";
import requestModel from "../../../database/models/request.model.js";
import deleteOne from "../../utils/handler/refactor.handler.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import ApiFeature from "../../utils/services/ApiFeatures.js";
import AppError from "../../utils/services/AppError.js";
import cloudinary from "../../utils/services/cloudinary.js";

export const createRequest = catchAsyncError(async(req,res,next)=>{
    req.body.owner = req.user._id;
    req.body.startDate = new Date(req.body.startDate); 
    req.body.endDate = new Date(req.body.endDate);
    if (req.body.startDate >= req.body.endDate) {
        return next(new AppError(`End date must be after start date`,400))
    }
   // Calculate duration in days using Moment.js
  const durationInDays = moment.duration(req.body.endDate - req.body.startDate).asDays();
  // Ensure non-negative duration (optional)
  req.body.duration = Math.max(0, durationInDays); // Handles cases where endDate < startDate
     
  //image upload
  delete req.body.image // delete image from req.body to avoid error
   if (req.file) {
      let {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{folder:`workflow/requests_attachments`})
      req.body.image = {secure_url,public_id};
      }
      
    let result = await requestModel.create(req.body);
    res.json({message:"done",result});
})

export const getRequests = catchAsyncError(async(req,res,next)=>{
    let apiFeature= new ApiFeature(requestModel.find().populate("owner","name , id"),req.query).filter().sort().search().fields()
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
    delete req.body.image // delete image from req.body to avoid error
    //image upload
    const findUser = await requestModel.findById(id);
    if (req.file) {
        findUser.image && await cloudinary.uploader.destroy(findUser.image.public_id)  //delete old image
    
        let {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{folder:`workflow/requests_attachments`})
         req.body.image = {secure_url,public_id};
          }

    let result = await requestModel.findOneAndUpdate({_id:id ,owner:req.user._id},req.body,{new:true});
    res.json({message:"done",result});
})

export const deleteRequest = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    const findUser = await requestModel.findById(id);
    findUser.image && await cloudinary.uploader.destroy(findUser.image.public_id)
    let user = await requestModel.findByIdAndDelete(id);
    !user && next(new AppError("Employee not found", 404));
    user && res.json({message: "Done", user }); 
  })
