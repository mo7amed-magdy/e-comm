import Joi from "joi";

const addReviewVal =Joi.object({
    text: Joi.string().min(1).max(200).trim().required(),
    rate: Joi.number().min(1).max(5).required(),
    product: Joi.string().required().hex().length(24)
})

const paramsIdVal =Joi.object({
    id: Joi.string().required().hex().length(24)
})

const updateReviewVal = Joi.object({
    text: Joi.string().min(1).max(200).trim(),
    rate: Joi.number().min(1).max(5),
    id: Joi.string().required().hex().length(24)
})


export {
    addReviewVal,paramsIdVal,updateReviewVal
}