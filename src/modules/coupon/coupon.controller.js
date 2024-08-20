
import { catchError } from './../../middleware/catchError.js';
import { deleteOne } from '../handlers/handlers.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';
import { AppError } from '../../utils/appError.js';
import { couponModel } from './../../../database/models/coupon.model.js';

const addCoupon = catchError(async (req,res,next)=>{
        let isCouponExist = await couponModel.findOne({code:req.body.code})        
        if(isCouponExist) return next(new AppError('coupon already exist',401))
        let coupon = new couponModel(req.body)
        await coupon.save() 
        res.json({message:"success",coupon}) 
    })

const getAllCoupons = catchError(async (req,res,next)=>{

    let apiFeatures = new ApiFeatures(couponModel.find(),req.query)
    .fields().filter().pagination().search('code').sort()
        
    let coupons = await apiFeatures.query

    res.json({message:"success",page:apiFeatures.pageNumber,coupons}) 
})

const getSingleCoupon = catchError(async (req,res,next)=>{
     
    let coupon = await couponModel.findById(req.params.id)
    !coupon && res.status(404).json({message:"coupon not found"})
    coupon && res.json({message:"success",coupon})
})
const updateCoupon = catchError(async (req,res,next)=>{
    
    let coupon = await couponModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    !coupon && res.status(404).json({message:"coupon not found"})
    coupon && res.json({message:"success",coupon})
    
})
const deleteCoupon = deleteOne(couponModel)

export {
    addCoupon,
    updateCoupon,
    getAllCoupons,
    getSingleCoupon,
    deleteCoupon,
 
}