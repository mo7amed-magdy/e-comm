import express from "express"
import { validation } from './../../middleware/validation.js';
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addAdresstVal, paramsIdVal } from "./address.validation.js";
import { addAddress, getAddress, removeAddress } from "./address.controller.js";


const addressRouter = express.Router()

addressRouter.route('/')
.patch(protectedRoutes,allowedTo('user'),validation(addAdresstVal),addAddress)
.get(protectedRoutes,allowedTo('user','admin'),getAddress)

addressRouter.route('/:id')
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removeAddress)


export default addressRouter