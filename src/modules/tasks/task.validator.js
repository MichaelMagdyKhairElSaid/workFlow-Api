import Joi from "joi";

export const addTaskSchema = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    description:Joi.string().min(15).max(300).required(),
    startdate:Joi.string().required(),
    enddate:Joi.string().required(),
    assignTo:Joi.string().hex().length(24).required()
    })

    export const updateTaskSchema = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    description:Joi.string().min(15).max(300).required(),
    userId:Joi.string().hex().length(24).required(),
    assignTo:Joi.string().hex().length(24).required()
    })

    export const deleteTaskSchema = Joi.object({
    assignTo:Joi.string().hex().length(24).required(),
    userId:Joi.string().hex().length(24).required(),
    })