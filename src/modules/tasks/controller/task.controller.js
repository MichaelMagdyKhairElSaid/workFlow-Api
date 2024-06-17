import taskModel from "../../../../database/models/task.model.js"
import employeeModel from "../../../../database/models/employee.model.js";
import deleteOne from "../../../utils/handler/refactor.handler.js";
import  catchAsyncError  from '../../../utils/middleware/catchAsyncError.js'
import ApiFeature from "../../../utils/services/ApiFeatures.js";
import  AppError  from "../../../utils/services/AppError.js";

//NOTE : task api need to be tested

//add task
export const addTask = catchAsyncError(async (req, res,next) => {
    req.body.owner = req.user._id
    const assignTo = await employeeModel.findById(req.body.assignTo)
    //if assigned to isn't found
    if (!assignTo) {
      return next(new AppError(`User you want to assign this task not exist`,404))
    }

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (startDate >= endDate) {
        return res.status(400).json({ message: "End date must be after start date" });
    }

    const task = await taskModel.create(req.body)
    res.json({ message: "Done", task })

});

// get all tasks with user data 
export const getAllTasks = async (req, res) => {
    let apiFeature= new ApiFeature(taskModel.find().populate( {path:'assignTo',select:'name email'}),req.query).filter().sort().search().fields()
    let result = await apiFeature.mongooseQuery
    res.json({message:"Done",result});
  };

//get tasks of oneUser 
export const getUserTasks = catchAsyncError(async (req, res,next) => {
let {id} = req.params //user id
    let foundUser = await employeeModel.findById(id);
    if(!foundUser){
        next(new AppError("User no exist",404))
    }
    let task = await taskModel.find({ assignTo: userId })
    res.json({message:"user tasks ",task})
});

//update task
export const updateTask = catchAsyncError(async (req, res,next) => {

    let { id } = req.params;
    let findTask = await taskModel.findById(id)
    //find if task already exist
    if (!findTask) {
        next(new AppError(`task not exist`,404))
    }
    const assignTo = await employeeModel.findById(req.body.assignTo)
    if (!assignTo) {
        next(new AppError(`User you want to assign this task not exist`,404))
    }
    if (req.body.startDate) {
        req.body.startDate = new Date(req.body.startDate);
    }
    if (req.body.endDate) {
        req.body.endDate = new Date(req.body.endDate);       
    }
    const task = await taskModel.findByIdAndUpdate(id, req.body,{new:true})
    return res.json({ message: "Task updated successfully", task })

});

// delete task
export const deleteTask =deleteOne(taskModel)

