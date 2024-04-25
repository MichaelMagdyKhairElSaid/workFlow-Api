import express from 'express';
import * as notifiController from './notification.controller.js'
import { allowTo, protectRoutes } from '../auth/auth.controller.js';
const notificationRouter = express.Router();


notificationRouter.route("/")
.get(notifiController.getAllNotification)
.post(protectRoutes,allowTo("admin"),notifiController.createNotification);

notificationRouter.route("/:id")
.delete(protectRoutes,allowTo("admin"),notifiController.deleteNotification);

export default notificationRouter;