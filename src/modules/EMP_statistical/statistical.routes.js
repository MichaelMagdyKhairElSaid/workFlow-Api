import express from "express"
import * as statisticalController from "./statistical.controller.js"

const statisticalRouter = express.Router()

statisticalRouter
    .route("/request")
    .get(statisticalController.getAbsenceStatistical)
statisticalRouter
    .route("/task")
    .get(statisticalController.getTaskStatistical)
export default statisticalRouter
