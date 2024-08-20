
import { catchError } from './../../middleware/catchError.js';
import { deleteOne } from '../handlers/handlers.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';
import { reviewModel } from './../../../database/models/review.model.js';
import { AppError } from '../../utils/appError.js';

const addReview = catchError(async (req,res,next)=>{
        req.body.user = req.user._id
        let user = await reviewModel.findOne({user:req.body.user,product:req.body.product})        
        if(user) return next(new AppError('you have already reviewed this product',401))
        let review = new reviewModel(req.body)
        await review.save() 
        res.json({message:"success",review}) 
    })

const getAllReviews = catchError(async (req,res,next)=>{

    let apiFeatures = new ApiFeatures(reviewModel.find(),req.query)
    .fields().filter().pagination().search('text').sort()
        
    let reviews = await apiFeatures.query

    res.json({message:"success",page:apiFeatures.pageNumber,reviews}) 
})

const getSingleReview = catchError(async (req,res,next)=>{
     
    let review = await reviewModel.findById(req.params.id)
    !review && res.status(404).json({message:"review not found"})
    review && res.json({message:"success",review})
})
const updateReview = catchError(async (req,res,next)=>{
    
    let review = await reviewModel.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true})
    !review && res.status(404).json({message:"review not found"})
    review && res.json({message:"success",review})
    
})
const deleteReview = deleteOne(reviewModel)

export {
    addReview,
    updateReview,
    getAllReviews,
    getSingleReview,
    deleteReview,
 
}