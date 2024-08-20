import express from "express"
import { validation } from './../../middleware/validation.js';
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToCarttVal, paramsIdVal, updateCarttVal } from "./cart.validation.js";
import { addToCart, applyCoupon, clearLoggedUserCart, deleteCartItem, getLoggedUserCart, updateQuantity } from "./cart.controller.js";



const cartRouter = express.Router()

cartRouter.route('/')
.post(protectedRoutes,allowedTo('user'),validation(addToCarttVal),addToCart)
.get(protectedRoutes,allowedTo('user','admin'),getLoggedUserCart)
.delete(protectedRoutes,allowedTo('user','admin'),clearLoggedUserCart)

cartRouter.post('/applycoupon',protectedRoutes,allowedTo('user'),applyCoupon)

cartRouter.route('/:id')
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),deleteCartItem)
.put(protectedRoutes,allowedTo('user'),validation(updateCarttVal),updateQuantity)


export default cartRouter