import express from "express"
import { validation } from './../../middleware/validation.js';
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addWishListVal, paramsIdVal } from "./wishList.validation.js";
import { addToWishList, getWishList, removeFromWishList } from "./wishList.controller.js";


const wishListRouter = express.Router()

wishListRouter.route('/')
.patch(protectedRoutes,allowedTo('user'),validation(addWishListVal),addToWishList)
.get(protectedRoutes,allowedTo('user','admin'),getWishList)

wishListRouter.route('/:id')
.delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removeFromWishList)


export default wishListRouter