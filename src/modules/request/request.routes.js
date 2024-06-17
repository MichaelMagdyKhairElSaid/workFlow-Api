import express from 'express'; 
import * as requestController from './request.controller.js';
import { protectRoutes } from '../auth/auth.controller.js';
import { onlineFileUpload } from '../../utils/services/fileUploader.js';
const requestRouter = express.Router();

requestRouter.route("/")
.get( requestController.getRequests)
.post(protectRoutes,onlineFileUpload(),requestController.createRequest)

requestRouter.route("/:id")
.get(requestController.getRequestById)
.put(protectRoutes,onlineFileUpload(),requestController.editRequest)
.delete(protectRoutes,requestController.deleteRequest)

export default requestRouter;