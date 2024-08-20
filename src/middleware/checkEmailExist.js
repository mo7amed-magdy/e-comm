import { userModel } from "../../database/models/user.model.js"
import { AppError } from "../utils/appError.js"



    export const checkEmailExist = async (req,res,next) =>{
        let user = await userModel.findOne({email:req.body.email})
        if(user) return next(new AppError('user already exist',409))
            next()
    }