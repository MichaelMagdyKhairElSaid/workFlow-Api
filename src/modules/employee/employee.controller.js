import employeeModel from "../../../database/models/employee.model.js";

export const addEmployee = async (req, res) => {
const {name, email, phone, password,address,gender,birthDate,social_status,fingerPrint,role} = req.body;
console.log(req.body);
const user = await employeeModel.create({name,email,phone,password,address,gender,birthDate,social_status,fingerPrint,role})
res.json({message:"Employee added successfully",data:user});
}

export const getEmployee = async (req, res) => {
const user = await employeeModel.findAll();
res.json({message:"done",data:user});
}

export const getEmployeeById = async (req, res) => {
const {id} = req.params;
const user = await employeeModel.findById(id);
res.json({message:"done",data:user});
}

