import express from "express"
import * as authController from "./auth.controller.js" 
const authRouter = express.Router()

authRouter.post("/signIn",authController.signIn)
authRouter.post("/logOut",authController.logOut)
authRouter.put("/changePassword",authController.protectRoutes,authController.ChangePassword)

export default authRouter