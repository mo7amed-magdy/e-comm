import Joi from "joi";

const addCouponVal =Joi.object({
    code: Joi.string().min(1).max(20).trim().required(),
    discount: Joi.number().min(1).required(),
    expires: Joi.date().required()
})

const paramsIdVal =Joi.object({
    id: Joi.string().required().hex().length(24)
})

const updateCouponVal = Joi.object({
    code: Joi.string().min(1).max(20).trim(),
    discount: Joi.number().min(1),
    expires: Joi.date(),
    id: Joi.string().required().hex().length(24)
})


export {
    addCouponVal,paramsIdVal,updateCouponVal
}