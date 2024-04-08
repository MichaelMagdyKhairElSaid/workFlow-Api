import Joi from "joi";
import moment from 'moment';
export const addUserSchema = Joi.object({
    name:Joi.string().min(2).max(30).required(),
    email:Joi.string().email({tlds:{allow:['com','net','eg']}}).required(),
    password:Joi.string().pattern(/[0-9]{3,8}$/).required(),
    // password: Joi.string().pattern(/^[A-Za-z0-9].{8,}$/).required(),
    // password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])([A-Za-z0-9!@#$%^&*]{8,})$/).required(),
    gender: Joi.string().valid('male', 'female').required(),
    phone: Joi.string().pattern(/^[0-9]{11}$/).required(),
    birthDate: Joi.date().iso().required(),
});
export const editUserSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email:Joi.string().email({tlds:{allow:['com','net','eg']}}).required(),
    phone: Joi.string().pattern(/^[0-9]{11}$/).required(),
    _id: Joi.string().hex().length(24).required(), 
  });
