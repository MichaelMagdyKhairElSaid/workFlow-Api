import express from 'express'; 
import * as workRecordController from './workRecord.controller.js';
import { protectRoutes } from '../auth/auth.controller.js';
const workRecordRouter = express.Router();

workRecordRouter.route("/clockIn")
.post(protectRoutes, workRecordController.clockIn)

workRecordRouter.route("/clockOut")
.post(protectRoutes, workRecordController.clockOut)

workRecordRouter.route("/")
.get( workRecordController.getWorkRecords)

workRecordRouter.route("/:id")
.get(workRecordController.getWorkRecordById)
.put(protectRoutes,workRecordController.editWorkRecord)
.delete(protectRoutes,workRecordController.deleteWorkRecord)

export default workRecordRouter;