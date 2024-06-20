import employeeModel from "../../../database/models/employee.model.js";
import deleteOne from "../../utils/handler/refactor.handler.js";
import  catchAsyncError  from "../../utils/middleware/catchAsyncError.js";
import ApiFeature from "../../utils/services/ApiFeatures.js";
import AppError from "../../utils/services/AppError.js";
import cloudinary from "../../utils/services/cloudinary.js";

export const addUser = catchAsyncError(async (req, res, next) => {
  //find if email is already exist
    let user = await employeeModel.findOne({ email: req.body.email });
    if (user) return next(new AppError("Duplicated Email", 409));
  
    delete req.body.image //to avoid error
    //image upload
  if (req.file) {

    let {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{folder:`workflow/${req.user.role}`})
    req.body.image = {secure_url,public_id};
    }
    
    //save to database
    let results = new employeeModel(req.body);
    let add = await results.save();
    res.status(201).json({message: "Added", add });
  });

  export const getAllUsers =catchAsyncError( async (req, res) => {
    let apiFeature= new ApiFeature(employeeModel.find(),req.query).filter().sort().search().fields()
    let result = await apiFeature.mongooseQuery
    res.json({message:"Done",result});
  })

  export const getUserById = catchAsyncError(async (req, res, next) => {
      let { _id } = req.params;
      let user = await employeeModel.findById(_id);
      res.json({message: "Done", user });
    });

  export const editUser = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
   const findUser = await employeeModel.findById(id);
   delete req.body.image //to avoid error
    //image upload
    if (req.file) {
      
    findUser.image && await cloudinary.uploader.destroy(findUser.image.public_id)  //delete old image

    let {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{folder:`workflow/${req.user.role}`})
     req.body.image = {secure_url,public_id};
      }

    delete req.body.password; // to avoid changing password
    let user = await employeeModel.findByIdAndUpdate(id, req.body, { new: true });
    !user && next(new AppError("Employee not found", 404));
    user && res.json({message: "Done", user });
  });
  
  export const deleteUser = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    const findUser = await employeeModel.findById(id);
    findUser.image && await cloudinary.uploader.destroy(findUser.image.public_id)
    let user = await employeeModel.findByIdAndDelete(id);
    !user && next(new AppError("Employee not found", 404));
    user && res.json({message: "Done", user }); 
  })

