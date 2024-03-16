import bcrypt from "bcrypt" 
import employeeModel from "../../../database/models/employee.model.js";
import jwt from "jsonwebtoken"

export const signIn =asyncHandler(async(req, res, next)=>{
    let { email, password } = req.body;
    let isFound = await employeeModel.findOne({ email });
    
    const match =  bcrypt.compareSync(password, isFound.password);
    
    if (isFound && match) { 
        // if (isFound.isActive == true){ return next(new AppError("you have account aready active", 409));}
        // let activate = await employeeModel.findByIdAndUpdate(isFound.id,{isActive:true}) //why findByIdAndUpdate enter findOneAndUpdate in employeeModel??
  
      let token = jwt.sign({ name: isFound.name, userld: isFound._id, role: isFound.role },process.env.ENCYPTION_KEY)
        return res.json({message:"success",  token })
        }
    next(new AppError("incorrect email or password", 401))
    })

    export const protectRoutes = asyncHandler(async(req,res,next)=>{
        //1-check have token or not
    let {token}=req.headers;
    if(!token) return next(new AppError('please provide token',401))
        //2-verify token
    let decoded = await jwt.verify(token,process.env.ENCYPTION_KEY)
    console.log(decoded);
        //3-if user of token exist or not
    let user = await employeeModel.findById(decoded.userID)
    if(!user)return next(new AppError("invalid user",404))
    //4- check if this token is the  last one or not (change password)
/*     if(user.changePassAt){
        let changePasswordTime =parseInt(user.changePassAt.getTime()/1000) //NOTE:bigger number is newest
        if (changePasswordTime >decoded.iat) return next(new AppError("invalid token",401))
    } */
    req.user = user
    next()
    }) 

    export const allowTo = (...role)=>{ //NOTE: spread operator collect prameter as array
        return asyncHandler((req,res,next)=>{
            if(!role.includes(req.user.role)) return next(new AppError("not authirzed",403))
         console.log("roles",role,req.user);
         next()
     })
    }

    export const logOut =asyncHandler(async(req, res, next)=>{
        let {email} = req.body;
        let user = await employeeModel.findOne({ email });
            if (user) {
            if (user.isActive ==false) {return next(new AppError("user already logged out", 409))}
            user.isActive =false
            await user.save()
            return res.json({message:"account logged out"})
            }
        next(new AppError("user not found", 404))
        })