import Joi from "joi";

const addAdresstVal =Joi.object({
    street:Joi.string().trim().required(),
    city:Joi.string().trim().required(),
    phone:Joi.string().trim().required(),
})

const paramsIdVal =Joi.object({
    id: Joi.string().required().hex().length(24)
})

const updateAdresstVal = Joi.object({
    street:Joi.string().trim(),
    city:Joi.string().trim(),
    phone:Joi.string().trim(),

})


export {
    addAdresstVal,paramsIdVal,updateAdresstVal
}