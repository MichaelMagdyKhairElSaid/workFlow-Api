
import mongoose, { Types } from 'mongoose';

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,, "Task title required" ],
        trim:true,
        minlength:[4,"Too short task title"] //shortest title --> Task
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:[10,"Too short description"]
    },
    startDate:{
        type:Date,
        required:[true,"Start date required"]
    },
    endDate:{
        type:Date,
        required:[true,"End date required"]
    },
    owner:{
        type:Types.ObjectId,
        ref:'Employee',
        required:[true,"Task owner ID required"]
    },
    assignTo:{
        type:Types.ObjectId,
        ref:'Employee',
        required:[true,"AssignTo ID required"],
    },
    //added by michael
    status:{ 
        type:String,
        required:true,
        enum:["pending","done"],
        default:"pending"
    },
    photos:{
    type:Object
    }
},{timestamps:true});

taskSchema.pre("findOneAndUpdate",function () { //FIXME: handel if startDate or endDate is only provided
if (this._update.startDate >= this._update.endDate) {
        return res.status(400).json({ message: "End date must be after start date" });
    }
})
const taskModel = mongoose.model("Task",taskSchema);



export default taskModel;