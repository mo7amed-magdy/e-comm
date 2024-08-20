import Joi from "joi";

const addSubCategoryVal =Joi.object({
    name: Joi.string().min(2).max(100).required().trim(),
    category:  Joi.string().required().hex().length(24)
})

const paramsIdVal =Joi.object({
    id: Joi.string().required().hex().length(24)
})

const updateSubCategoryVal = Joi.object({
    name: Joi.string().min(2).max(100).trim(),
    id: Joi.string().required().hex().length(24),
    category:  Joi.string().hex().length(24)

})


export {
    addSubCategoryVal,paramsIdVal,updateSubCategoryVal
}