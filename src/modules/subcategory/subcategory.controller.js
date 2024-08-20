
import slugify from 'slugify';
import { catchError } from './../../middleware/catchError.js';
import { subCategoryModel } from './../../../database/models/subCategory.model.js';
import { deleteOne } from '../handlers/handlers.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';

const addSubCategory = catchError(async (req,res,next)=>{
        req.body.slug = slugify(req.body.name) 
        let subCategory = new subCategoryModel(req.body)
        await subCategory.save() 
        res.json({message:"success",subCategory}) 
    })

const getAllSubCategories = catchError(async (req,res,next)=>{
    let filterObj ={}
    if(req.params.category) filterObj.category =  req.params.category

    let apiFeatures = new ApiFeatures(subCategoryModel.find(filterObj),req.query)
    .fields().filter().pagination().search('name').sort()
        
    let subCategories = await apiFeatures.query

    res.json({message:"success",page:apiFeatures.pageNumber,subCategories}) 
})

const getSingleSubCategory = catchError(async (req,res,next)=>{
     
    let subCategory = await subCategoryModel.findById(req.params.id)
    !subCategory && res.status(404).json({message:"subCategory not found"})
    subCategory && res.json({message:"success",subCategory})
})
const updateSubCategory = catchError(async (req,res,next)=>{
    if (req.body.name) req.body.slug = slugify(req.body.name) 
    let subCategory = await subCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !subCategory && res.status(404).json({message:"subCategory not found"})
    subCategory && res.json({message:"success",subCategory})
    
})
const deleteSubCategory = deleteOne(subCategoryModel)

export {
    addSubCategory,
    updateSubCategory,
    getAllSubCategories,
    getSingleSubCategory,
    deleteSubCategory,
 
}