
import { catchError } from './../../middleware/catchError.js'; 
import { cartModel } from '../../../database/models/cart.model.js';
import { productModel } from './../../../database/models/product.model.js';
import { AppError } from '../../utils/appError.js';
import { couponModel } from './../../../database/models/coupon.model.js';

const calcTotalPrice =(cart)=>{
    let total = 0
    cart.cartItems.forEach((item) => {
        total += item.price * item.quantity
    })
    cart.totalPrice = total
    if(cart.discount) cart.priceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100
}

const addToCart = catchError(async (req,res,next)=>{
    
    let cart = await cartModel.findOne({user:req.user._id})
    let product = await productModel.findById(req.body.product)
    if(!product) return next(new AppError('Product not found'))
    if(product.quantity < req.body.quantity) return next(new AppError('Sold Out'))
    req.body.price = product.price
    if(!cart){
        cart = new cartModel({user:req.user._id,
            cartItems:[req.body]
        })
        calcTotalPrice(cart)
        await cart.save()
        res.json({message:"success",cart})
    }else{
        let item = cart.cartItems.find((item) => item.product == req.body.product)
        if(item) {
            let newQ = item.quantity + req.body.quantity || 1
            if(newQ > product.quantity ) return next(new AppError('Sold Out'))
            if(req.body.quantity < 1 ) return next(new AppError('Quantity must be greater than 0'))
            item.quantity += req.body.quantity || 1
        }
        else cart.cartItems.push(req.body)
         
        calcTotalPrice(cart)
        await cart.save()
        res.json({message:"success",cart}) 
    }
})
const deleteCartItem = catchError(async (req,res,next)=>{
    
    let cart = await cartModel.findOneAndUpdate({user:req.user._id},{$pull : {cartItems:{_id:req.params.id}}},{new:true})
    !cart && res.status(404).json({message:"cart not found"})
    calcTotalPrice(cart)
    await cart.save()
    cart && res.json({message:"success",cart})
    
})

const updateQuantity = catchError(async (req,res,next)=>{
    
    let cart = await cartModel.findOne({user:req.user._id})
    if(!cart) res.status(404).json({message:"cart not found"})
    let item = cart.cartItems.find((item)=> item._id == req.params.id)
    if(!item) return next(new AppError('Product not found'))
    let product = await productModel.findById(item.product)
    if(product.quantity < req.body.quantity) return next(new AppError('Sold Out'))
    item.quantity = req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    cart && res.json({message:"success",cart})
    
})
const getLoggedUserCart = catchError(async (req,res,next)=>{
    
    let cart = await cartModel.findOne({user: req.user._id}).populate('cartItems.product')
    !cart && res.status(404).json({message:"cart not found"})
    cart && res.json({message:"success",cart})
    
})
const clearLoggedUserCart = catchError(async (req,res,next)=>{
    
    let cart = await cartModel.findOneAndDelete({user: req.user._id})
    !cart && res.status(404).json({message:"cart not found"})
    cart && res.json({message:"success",cart})
    
})

const applyCoupon = catchError(async (req,res,next)=>{
    
   let coupon = await couponModel.findOne({code:req.body.coupon,expires:{$gte : Date.now()}})
   if(!coupon) return next(new AppError('Coupon not found'))
    let cart = await cartModel.findOne({user:req.user._id})
    if(!cart)  return next(new AppError('cart not found'))
    
    cart.discount = coupon.discount 
    calcTotalPrice(cart)
    await cart.save()
    res.json({message:"success",cart})
    
})

export {
    addToCart,
    deleteCartItem,
    updateQuantity,
    getLoggedUserCart,
    clearLoggedUserCart,
    applyCoupon
}
