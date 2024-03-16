import mongoose from "mongoose";

const employeeSchema = new  mongoose.Schema({
name:{
    type:String,trim:true,
    require:[true,"name is required"],
    minLenght:[2,"name is too short"]
},
email:{
    type:String,
    trim:true,
    require:[true,"email is required"],
    minLenght:1,
    unique:[true,"email must be unique"],
},
phone:{
    type:String,
    require:[true,"phone is required"],
},
password:{
    type:String,
    require:[true,"password is required"],
    minLenght:6
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
currentLocation: String,
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
}, {timestamps: true});

userSchema.pre("save",function () { //return document that is object
    // console.log(this); //document
     this.password = bcrypt.hashSync(this.password,Number(process.env.SALT_ROUNDS))
})

userSchema.pre("findOneAndUpdate",function () { //return all query rleatd and not rleated to my document
    console.log("this =============="+ this); //query
    console.log("Number(process.env.SALT_ROUNDS) ="+Number(process.env.SALT_ROUNDS));
    
    this._update.password = bcrypt.hashSync(this._update.password,Number(process.env.SALT_ROUNDS))
})



const employeeModel = mongoose.model("Employee", employeeSchema);
export default employeeModel;