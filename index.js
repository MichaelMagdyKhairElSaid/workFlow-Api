import express from 'express';
import cors from 'cors';
import dbConnection from './database/db_connection.js';
import employeeRouter from './src/modules/employee/employee.routes.js';
import { configDotenv } from 'dotenv';
import authRouter from './src/modules/auth/auth.routes.js';
import workRecordRouter from './src/modules/workRecord/workRecord.routes.js';
import requestRouter from './src/modules/request/request.routes.js';
import  {globalError}  from './src/utils/middleware/globalErrorHandel.js';
import AppError from './src/utils/services/AppError.js';
import taskRouter from './src/modules/tasks/task.routes.js';
import notificationRouter from './src/modules/notification/notification.routes.js';
import alertRouter from './src/modules/alert/alert.routes.js';
import statisticalRouter from './src/modules/EMP_statistical/statistical.routes.js';
const app = express();
const port = 3000;

configDotenv(); // Add this line to configure dotenv

dbConnection();
app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.urlencoded({extended:true})) // to parse form data

app.use("/api/v1/employee",employeeRouter)
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/workRecord",workRecordRouter)
app.use("/api/v1/request",requestRouter)
app.use("/api/v1/task",taskRouter)
app.use("/api/v1/notification",notificationRouter)
app.use("/api/v1/alert",alertRouter)
app.use("/api/v1/statistical",statisticalRouter)

app.all("*",(req,res,next)=>{ next(new AppError(`Invalid URL ${req.originalUrl}`,404)) }) //NOTE invalid url handeler must be after all routes

app.use(globalError)

app.listen(process.env.PORT || port , () => {
    console.log(`server is running on port ${port}`);
});
