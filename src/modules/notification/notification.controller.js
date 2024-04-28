import notificationModel from "../../../database/models/notification.model.js"
import deleteOne from "../../utils/handler/refactor.handler.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import ApiFeature from "../../utils/services/ApiFeatures.js";

export const createNotification = catchAsyncError(async (req, res, next) => {
  req.body.owner = req.user._id;
  let results = new notificationModel(req.body);
  let send = await results.save();
  res.json({message: "Notification Sent", send });
});

export const getAllNotification = catchAsyncError(async (req, res, next) => {
  let apiFeature= new ApiFeature(notificationModel.find(),req.query).pagination().filter().sort().search().fields()
  let result = await apiFeature.mongooseQuery
  res.json({message:"done",result});
});

export const deleteNotification = deleteOne(notificationModel)