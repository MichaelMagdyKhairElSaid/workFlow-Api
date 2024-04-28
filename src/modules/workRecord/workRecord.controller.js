import workRecordModel from "../../../database/models/workRecord.model.js";
import deleteOne from "../../utils/handler/refactor.handler.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import moment from "moment";
import AppError from "../../utils/services/AppError.js";
import ApiFeature from "../../utils/services/ApiFeatures.js";

export const clockIn = catchAsyncError(async (req, res, next) => {
    const existingRecord = await workRecordModel.findOne({
      clockIn: { $gte: moment().startOf('day').toDate(), $lt: moment().endOf('day').toDate() }
    }); 
    if (existingRecord) {
    return next(new AppError(`Only one record can be created per day`,400))
    } else {
      const record = await workRecordModel.create({
        clockIn: moment().format('YYYY-MM-DD HH:mm'),
        owner: req.user._id
      });
  
      res.json({ message: "done", record });
    }
  });

export const clockOut = catchAsyncError(async(req,res,next)=>{ 

    const existingRecord = await workRecordModel.findOne({
      clockIn: { $gte: moment().startOf('day').toDate(), $lt: moment().endOf('day').toDate() }
    });
    if (existingRecord.clockOut) {
      return next(new AppError(`one checkout per day`,400))
    }
    const currentDate = moment(moment().format('YYYY-MM-DD HH:mm')); // Convert to moment object
    const diffInMs = Math.abs(currentDate - existingRecord.clockIn);
    const workingHours = Math.floor(diffInMs / (1000 * 60 * 60)); // Calculate hours as integer

  // Calculate minutes (considering potential decimals)
  const remainingMinutes = (diffInMs % (1000 * 60 * 60)) / (1000 * 60);
  const workingMinutes = Math.floor(remainingMinutes); // Get whole minutes

  // Format working hours in HH:mm string
  const formattedWorkHours = `${workingHours.toString().padStart(2, '0')}:${workingMinutes.toString().padStart(2, '0')}`;
    let record = await workRecordModel.findOneAndUpdate({_id:existingRecord._id,owner:req.user._id},{ clockOut:currentDate ,workingHours:formattedWorkHours},{new:true});
    res.json({message:"done",record});
})

export const getWorkRecords = catchAsyncError(async(req,res,next)=>{
    let apiFeature= new ApiFeature(workRecordModel.find(),req.query).pagination().filter().sort().search().fields()
    let result = await apiFeature.mongooseQuery
    res.json({message:"done",result});
})

export const getWorkRecordById = catchAsyncError(async(req,res,next)=>{
    let {id} = req.params;
    let record = await workRecordModel.findById(id)
    res.json({message:"done",record});
})

export const editWorkRecord = catchAsyncError(async(req,res,next)=>{
    let {id} = req.params;
    if (req.body.clockIn) {
        req.body.clockIn = moment(req.body.clockIn, 'YYYY-MM-DD HH:mm').toDate() ;
    }
    if (req.body.clockOut) {
        req.body.clockOut = moment(req.body.clockOut, 'YYYY-MM-DD HH:mm').toDate() ;
    }
    let record = await workRecordModel.findOneAndUpdate({_id:id,owner:req.user._id},req.body,{new:true});
    res.json({message:"done",record});
})

export const deleteWorkRecord = deleteOne(workRecordModel)
