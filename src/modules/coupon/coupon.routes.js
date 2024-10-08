import express from "express"
import { validation } from './../../middleware/validation.js';
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addCouponVal, paramsIdVal, updateCouponVal } from "./coupon.validation.js";
import { addCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from "./coupon.controller.js";


const couponRouter = express.Router()
couponRouter.use(protectedRoutes,allowedTo('admin'))
couponRouter.route('/')
.post(validation(addCouponVal),addCoupon)
.get(getAllCoupons)

couponRouter.route('/:id')
.get(validation(paramsIdVal),getSingleCoupon)
.put(validation(updateCouponVal),updateCoupon)
.delete(validation(paramsIdVal),deleteCoupon)


export default couponRouter