import bcrypt from "bcrypt" 
import employeeModel from "../../../database/models/employee.model.js";
import jwt from "jsonwebtoken"
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import AppError from "../../utils/services/AppError.js";

export const signIn =catchAsyncError(async(req, res, next)=>{
    let { email, password } = req.body;
    let isFound = await employeeModel.findOne({ email });
    if(!isFound){return next(new AppError("User not found", 401))} //handel if user's email not found
    const match =  bcrypt.compareSync(password, isFound.password);
    if (isFound && match) { 
        if (isFound.isActive == true){ return next(new AppError("you have account aready active", 409));}
        await employeeModel.findByIdAndUpdate(isFound.id,{isActive:true},{new:true}) 
      let token = jwt.sign({ name: isFound.name, userld: isFound._id, role: isFound.role },process.env.ENCYPTION_KEY)
        return res.json({message:"success",token  })
        }
    next(new AppError("incorrect password", 401))
    })

    export const protectRoutes = catchAsyncError(async(req,res,next)=>{
        //1-check have token or not
    let {token}=req.headers;
    if(!token) return next(new AppError('please provide token',401))
        //2-verify token
    let decoded = await jwt.verify(token,process.env.ENCYPTION_KEY)
    if(!decoded) return next(new AppError("invalid or expired token",401))
        //3-if user of token exist or not
    let user = await employeeModel.findById(decoded.userld)
    if(!user)return next(new AppError("invalid user",404))
    //4- check if this token is the  last one or not (change password)
/*     if(user.changePassAt){
        let changePasswordTime =parseInt(user.changePassAt.getTime()/1000) //NOTE:bigger number is newest
        if (changePasswordTime >decoded.iat) return next(new AppError("invalid token",401))
    } */
    req.user = user
    req.decoded  = decoded
    next()
    }) 

    export const allowTo = (...role)=>{ //NOTE: spread operator collect prameter as array
        return catchAsyncError(async(req,res,next)=>{
            if(!role.includes(req.user.role)) return next(new AppError("not authorized",403))
         next()
     })
    }

    export const ChangePassword = catchAsyncError(async(req,res,next)=>{ 
        // req.body.changePassAt = Date.now()
        let user = await employeeModel.findById(req.user._id)
        if(!user) return next(new AppError(`user not found`,404))
        user.password = req.body.password
        await user.save()
        res.json({message:"Done",user})
       })

    export const logOut =catchAsyncError(async(req, res, next)=>{
        let {email} = req.body;
        let user = await employeeModel.findOne({ email });
            if (user) {
            if (user.isActive ==false) {return next(new AppError("user already logged out", 409))}
            await employeeModel.findByIdAndUpdate(user.id,{isActive:false},{new:true})
            return res.json({message:"account logged out"})
            }
        next(new AppError("user not found", 404))
        })