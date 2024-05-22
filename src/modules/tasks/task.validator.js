import Joi from "joi";

export const addTaskSchema = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    description:Joi.string().min(5).max(300).required(),
    startDate:Joi.string().required(),
    endDate:Joi.string().required(),
    assignTo:Joi.string().hex().length(24).required(),
    status:Joi.string().valid("pending","done").required()
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