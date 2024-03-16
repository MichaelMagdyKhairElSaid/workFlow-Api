
import express from 'express';
import dbConnection from './database/db_connection.js';
import employeeRouter from './src/modules/employee/employee.routes.js';
import { configDotenv } from 'dotenv';
const app = express();
const port = 3000;

configDotenv(); // Add this line to configure dotenv

dbConnection();
app.use(express.json());
app.use("/api/v1/employee",employeeRouter)

app.listen(3000, () => {
    console.log(`server is running on port ${port}`);
});
