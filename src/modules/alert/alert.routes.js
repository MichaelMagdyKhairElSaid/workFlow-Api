import express from "express"
import * as alertController from "./alert.controller.js"
import { allowTo, protectRoutes } from "../auth/auth.controller.js"
const alertRouter = express.Router()

alertRouter.route("/")
.post( protectRoutes,allowTo("admin"),alertController.createAlert)
.get(alertController.getAllAlerts)

alertRouter.route("/:id")
.delete(protectRoutes,allowTo("admin"),alertController.deleteRequest)

export default alertRouter