import express from "express";
import * as taskController from "./controller/task.controller.js";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
const taskRouter = express.Router();

taskRouter.route("/")
  .get(taskController.getAllTasks)
  .post(protectRoutes, allowTo("admin"), taskController.addTask)
  

taskRouter.route("/:id")
.put(protectRoutes,allowTo('admin'),taskController.updateTask)
.delete(protectRoutes,allowTo("admin"),taskController.deleteTask)

export default taskRouter;
