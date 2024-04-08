
import express from 'express';
import dbConnection from './database/db_connection.js';
import employeeRouter from './src/modules/employee/employee.routes.js';
import { configDotenv } from 'dotenv';
import authRouter from './src/modules/auth/auth.routes.js';
import workRecordRouter from './src/modules/workRecord/workRecord.routes.js';
import requestRouter from './src/modules/request/request.routes.js';
const app = express();
const port = 3000;

configDotenv(); // Add this line to configure dotenv

dbConnection();
app.use(express.json());
app.use("/api/v1/employee",employeeRouter)
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/workRecord",workRecordRouter)
app.use("/api/v1/request",requestRouter)

app.listen(3000, () => {
    console.log(`server is running on port ${port}`);
});
