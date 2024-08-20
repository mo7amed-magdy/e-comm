import express from "express"
import { validation } from "../../middleware/validation.js"
import { changePasswordVal, signinSchemaVal, signupSchemaVal } from "./auth.validation.js"
import { checkEmailExist } from "../../middleware/checkEmailExist.js"
import { changePassword, protectedRoutes, signIn, signUp } from "./auth.controller.js"


const authRouter = express.Router()

authRouter.post('/signup',validation(signupSchemaVal),checkEmailExist,signUp)
authRouter.post('/signin',validation(signinSchemaVal),signIn)
authRouter.patch('/changePassword',protectedRoutes,validation(changePasswordVal),changePassword)


export default authRouter