import Joi from "joi";

const addProductVal =Joi.object({
    title: Joi.string().min(2).max(200).required().trim(),
    description: Joi.string().min(2).max(1000).required().trim(),
    price:Joi.number().min(0).required(),
    priceAfterDiscount:Joi.number().min(0),
    quantity:Joi.number().min(0).required(),
    category: Joi.string().required().hex().length(24),
    subcategory: Joi.string().required().hex().length(24),
    brand: Joi.string().required().hex().length(24),
    createdBy: Joi.string().hex().length(24),
    imgCover: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    })).required(),
        images: Joi.array().items(Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
            size: Joi.number().max(5242880).required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required()
            })).required()
})

const paramsIdVal =Joi.object({
    id: Joi.string().required().hex().length(24)
})

const updateProductVal = Joi.object({
    id: Joi.string().required().hex().length(24),
    title: Joi.string().min(2).max(200).trim(),
    description: Joi.string().min(2).max(1000).trim(),
    price:Joi.number().min(0),
    priceAfterDiscount:Joi.number().min(0),
    quantity:Joi.number().min(0),
    category: Joi.string().hex().length(24),
    subcategory: Joi.string().hex().length(24),
    brand: Joi.string().hex().length(24),
    createdBy: Joi.string().hex().length(24),
    imgCover: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    })),
        images: Joi.array().items(Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
            size: Joi.number().max(5242880).required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required()
            }))
})


export {
    addProductVal,paramsIdVal,updateProductVal
}