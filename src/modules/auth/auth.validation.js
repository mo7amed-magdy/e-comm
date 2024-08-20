
import Joi from "joi"

const signupSchemaVal = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9!@#$%^&*]{8,40}$/).required(),
    rePassword: Joi.valid(Joi.ref('password')).required(),

})


const signinSchemaVal = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9!@#$%^&*]{8,40}$/),

})
const changePasswordVal = Joi.object({
    password: Joi.string().pattern(/^[A-Z][a-z0-9!@#$%^&*]{8,40}$/).required(),
    newPassword: Joi.string().pattern(/^[A-Z][a-z0-9!@#$%^&*]{8,40}$/).required(),
    id:Joi.string().hex().length(24)
})


export {
    signupSchemaVal,
    signinSchemaVal,
    changePasswordVal
}