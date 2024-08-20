import Joi from "joi";

const addToCarttVal =Joi.object({
product:Joi.string().hex().length(24).required(),
quantity:Joi.number().integer().options({convert:false})
})

const paramsIdVal =Joi.object({
    id: Joi.string().hex().length(24).required()
})

const updateCarttVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    quantity:Joi.number().integer().options({convert:false}).required()



})


export {
    addToCarttVal,paramsIdVal,updateCarttVal
}