import express from "express"
import { validation } from './../../middleware/validation.js';
import { addUserVal, paramsVal, updateUserVal } from "./user.validation.js";
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "./user.controller.js";
import { checkEmailExist } from "../../middleware/checkEmailExist.js";


const userRouter = express.Router()

userRouter.route('/')
.post(validation(addUserVal),checkEmailExist,addUser)
.get(getAllUsers)

userRouter.route('/:id')
.get(validation(paramsVal),getSingleUser)
.put(validation(updateUserVal),updateUser)
.delete(validation(paramsVal),deleteUser)


export default userRouter