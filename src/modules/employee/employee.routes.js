
import express from 'express';
const userRouter = express.Router();
import * as employeeController from './employee.controller.js';
import { validation } from '../../utils/handler/validation.js';
import { addUserSchema, editUserSchema } from "./employee.validation.js";
import { allowTo, protectRoutes } from '../auth/auth.controller.js';
userRouter
  .route("/")
  .get(employeeController.getAllUsers)
  .post(protectRoutes,allowTo("admin"),employeeController.addUser);

userRouter
  .route("/:id")
  .get(employeeController.getUserById)
  .put(protectRoutes,allowTo("admin"),employeeController.editUser)
  .delete(protectRoutes,allowTo("admin"),employeeController.deleteUser);

export default userRouter;
