
import express from 'express';
const Router = express.Router();
import * as employeeController from './employee.controller.js';

Router.post("/",employeeController.addEmployee);

export default Router;