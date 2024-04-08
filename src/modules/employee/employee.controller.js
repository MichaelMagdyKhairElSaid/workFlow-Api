import employeeModel from "../../../database/models/employee.model.js";
import deleteOne from "../../utils/handler/refactor.handler.js";
import  catchAsyncError  from "../../utils/middleware/catchAsyncError.js";
import AppError from "../../utils/services/AppError.js";

// export const addEmployee = async (req, res) => {
// const {name, email, phone, password,address,gender,birthDate,social_status,fingerPrint,role} = req.body;
// console.log(req.body);
// const user = await employeeModel.create({name,email,phone,password,address,gender,birthDate,social_status,fingerPrint,role})
// res.json({message:"Employee added successfully",data:user});
// }

// export const getEmployee = async (req, res) => {
// const user = await employeeModel.findAll();
// res.json({message:"done",data:user});
// }

// export const getEmployeeById = async (req, res) => {
// const {id} = req.params;
// const user = await employeeModel.findById(id);
// res.json({message:"done",data:user});
// }
export const addUser = catchAsyncError(async (req, res, next) => {
    let user = await employeeModel.findOne({ email: req.body.email });
    if (user) return next(new AppError("Duplicated Email", 409));
    let results = new employeeModel(req.body);
    let add = await results.save();
    res.status(201).json({message: "Added", add });
  });
  export const getAllUsers = async (req, res) => {
    let user = await employeeModel.find({});
    res.json({message: "Done", user });
  };
  export const getUserById = catchAsyncError(async (req, res, next) => {
      let { _id } = req.params;
      let user = await employeeModel.findById(_id);
      res.json({message: "Done", user });
    });
  export const editUser = catchAsyncError(async (req, res, next) => {
    let { _id } = req.params;
    console.log("req.params===",req.body);
    delete req.body.password;
    let user = await employeeModel.findByIdAndUpdate(_id, req.body, { new: true });
    !user && next(new AppError("Employee not found", 404));
    user && res.json({message: "Done", user });
  });
  
  export const deleteUser = deleteOne(employeeModel);
