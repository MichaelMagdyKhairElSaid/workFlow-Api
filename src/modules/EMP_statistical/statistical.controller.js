import employeeModel from "../../../database/models/employee.model.js";
import requestModel from "../../../database/models/request.model.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import taskModel from "../../../database/models/task.model.js";

export const getAbsenceStatistical = catchAsyncError(async(req,res,next)=>{
  const {status} = req.body;
        const counts = await requestModel.aggregate([
          {
            $match: { // Added match stage to filter by status
              status: status || "accepted",
            },
          },
          {
            $group: {
              _id: "$reason", // Group by reason
              count: { $sum: 1 }, // Count documents in each group
            },
          },
        ]);
        const numOfEmp = await employeeModel.countDocuments({role: "user"});
     console.log(counts);
        const leaveTypeCounts = {
          sick: 0,
          vacation: 0,
          personal: 0,
          other: 0,
        };
    
        // Map results to the desired leave type counts object
        counts.forEach((item) => {
          leaveTypeCounts[item._id] = item.count;
        });
        res.json({message: "Done", leaveTypeCounts ,Total_Employees:numOfEmp });
})

export const getTaskStatistical = catchAsyncError(async(req,res,next)=>{
const counts = await taskModel.aggregate([{$group:{_id:"$status",count:{$sum:1}}}])
console.log(counts);
const taskStatusCounts = {
  pending: 0,
  done: 0,
};
counts.forEach((item) => {
  taskStatusCounts[item._id] = item.count;
});
res.json({message: "Done", taskStatusCounts});
})

