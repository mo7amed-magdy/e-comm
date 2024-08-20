import Joi from "joi";

const addWishListVal =Joi.object({
    product: Joi.string().required().hex().length(24).required()
})

const paramsIdVal =Joi.object({
    id: Joi.string().required().hex().length(24)
})

const updateWishListVal = Joi.object({
    product: Joi.string().required().hex().length(24).required()

})


export {
    addWishListVal,paramsIdVal,updateWishListVal
}