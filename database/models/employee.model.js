import mongoose from "mongoose";
import bcrypt from "bcrypt"
const employeeSchema = new  mongoose.Schema({
    name:{
        type:String,trim:true,
        required:[true,"name is required"],
        minLength:[2,"name is too short"]
    },    
email:{
    type:String,
    trim:true,
    required:[true,"email is required"],
    minLength:1,
    unique:[true,"email must be unique"],
},
phone:{
    type:String,
    required:[true,"phone is required"],
},
password:{
    type:String,
    required:[true,"password is required"],
    minLength:6
},
address: String,
gender:{type:String,default:"male",enum:["male","female"]},
birthDate: Date,    
social_status:{
    type:String,
    default:"single",
    enum:["single","married"]
},
fingerPrint: String,
role: {
    type:String,
    default:"user",
    enum:["user","admin"]   
},
isActive:{
    type:Boolean,
    default:false,
},
verified:{
    type:Boolean,
    default:false,
},
currentLocation:{
    type:String,
    default:"faculty of science",
},
image:{
    type:Object,
}
}, {timestamps: true});

employeeSchema.pre("save",function () { //return document that is object of this schema
     if (this.password && this.password.trim()) {
         this.password = bcrypt.hashSync(this.password,Number(process.env.SALT_ROUNDS))
     }
})

employeeSchema.pre("findOneAndUpdate",function () { //return all query rleatd and not rleated to my document

    if (this._update.password) { //make sure that only when password is sent then you can encrypt it 
    this._update.password = bcrypt.hashSync(this._update.password,Number(process.env.SALT_ROUNDS))
    }
})

const employeeModel = mongoose.model("Employee", employeeSchema);
export default employeeModel;