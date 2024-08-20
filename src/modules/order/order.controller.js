
import { catchError } from './../../middleware/catchError.js'; 
import { cartModel } from '../../../database/models/cart.model.js';
import { AppError } from '../../utils/appError.js';
import { orderModel } from '../../../database/models/order.model.js';
import { productModel } from './../../../database/models/product.model.js';
import Stripe from 'stripe';


const createCashOrder = catchError(async (req,res,next)=>{
    
    let cart = await cartModel.findById(req.params.id)
    if(!cart) return next(new AppError('cart not found',404))
    let totalOrderPrice = cart.priceAfterDiscount? cart.priceAfterDiscount:cart.totalPrice
    let order = new orderModel({
        user:req.user._id,
        totalOrderPrice,
        orderItems:cart.cartItems,
        shippingAddress:req.body.shippingAddress})
        await order.save()
        let options = cart.cartItems.map((prod) => {
            return (
                {
                    updateOne: {
                        "filter": { _id: prod.product },
                        "update": { $inc: { sold:prod.quantity ,quantity: -prod.quantity } }
                    }
                }
            )
        })
        await productModel.bulkWrite(options)
        await cartModel.findByIdAndDelete(req.params.id)
    res.json({message: 'success',order})
})

const getSpecificOrder = catchError(async(req,res,next)=>{
    let order = await orderModel.findOne({user:req.user._id}).populate('orderItems.product')
    if(!order) return next(new AppError('order not found',404))
    order && res.json({message:'success',order})
})

const getAllOrders = catchError(async(req,res,next)=>{
    let orders = await orderModel.find().populate('orderItems.product')
    if(!orders) return next(new AppError('order not found',404))
    orders && res.json({message:'success',orders})
})
const createChheckOutSession = catchError(async(req,res,next)=>{
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let cart = await cartModel.findById(req.params.id)
    if(!cart) return next(new AppError('cart not found',404))
    let totalOrderPrice = cart.priceAfterDiscount? cart.priceAfterDiscount:cart.totalPrice 
    let sessions = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency: 'egp',
                    unit_amount: totalOrderPrice*100,
                    product_data:{
                        name: req.user.name,
                    },
                },
                quantity:1,
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/api/v1/subcategories',
        cancel_url: 'http://localhost:3000/api/v1/products',
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress
    })
    res.json({message:'success',session:sessions})
})





export {
    createCashOrder,
    getSpecificOrder,
    getAllOrders,
    createChheckOutSession
}
