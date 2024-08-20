import { userModel } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import  bcrypt  from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import { AppError } from "../../utils/appError.js";


const signUp = catchError(async (req,res) =>{
    let user = new userModel(req.body)
    await user.save()
    let token = jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_KEY)

    res.json({message:"success",token})
 
})

const signIn = catchError(async (req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user&&bcrypt.compareSync(req.body.password,user.password)){
        let token = jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_KEY)
        return res.json({message:"loggedIn",token})
    }
    next(new AppError('incorrect email or password',401))
    })


    const changePassword = catchError(async (req,res,next) =>{
        let user = await userModel.findById(req.user._id)
        if(user&&bcrypt.compareSync(req.body.password,user.password)){
            await userModel.findByIdAndUpdate(req.user._id,{password:req.body.newPassword,passwordChangedAt:Date.now()})
            let token = jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_KEY)
            return res.json({message:"updated",token})
    }
    next(new AppError('incorrect password',401))
    })

    const protectedRoutes = catchError(async (req,res,next) =>{
        let {token} = req.headers
        if(!token) return next(new AppError('token not provided',401))
        let decodedToken = jwt.verify(token,process.env.JWT_KEY)
        let user = await userModel.findById(decodedToken.userId)
        if(!user) return next(new AppError('Invalid token',401))
        if(user.passwordChangedAt){
            let time = parseInt(user?.passwordChangedAt.getTime()/1000)
            if(time>decodedToken.iat) return next(new AppError('invalid token ..login again'))
        }
        
        req.user = user
        next()
    })


    const allowedTo =(...roles) =>{

        return catchError(async (req,res,next) =>{
            if(!roles.includes(req.user.role)) return next(new AppError('unauthorized',403))
            next()
        } )
    }

    export {
        signUp,
        signIn,
        changePassword,
        protectedRoutes,
        allowedTo
    }