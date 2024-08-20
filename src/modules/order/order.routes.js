import express from "express"
import { validation } from './../../middleware/validation.js';
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createOrderVal } from "./order.validation.js";
import { createCashOrder, createChheckOutSession, getAllOrders, getSpecificOrder } from "./order.controller.js";



const orderRouter = express.Router()

orderRouter.route('/')
.get(protectedRoutes,allowedTo('user','admin'),getSpecificOrder)

orderRouter.get('/allorders',protectedRoutes,allowedTo('admin'),getAllOrders)
orderRouter.post('/checkout/:id',protectedRoutes,allowedTo('user'),createChheckOutSession)

orderRouter.route('/:id')
.post(protectedRoutes,allowedTo('user'),validation(createOrderVal),createCashOrder)


export default orderRouter