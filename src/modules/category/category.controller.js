
import slugify from 'slugify';
import { categoryModel } from './../../../database/models/category.model.js';
import { catchError } from './../../middleware/catchError.js';
import { deleteOne } from '../handlers/handlers.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';

const addCategory = catchError(
    async (req,res,next)=>{
        req.body.image = req.file.filename
        req.body.slug = slugify(req.body.name) 
        let category = new categoryModel(req.body)
        await category.save() 
        res.json({message:"success",category}) 
    }
)
const getAllCategories = catchError(async (req,res,next)=>{
     
    let apiFeatures = new ApiFeatures(categoryModel.find(),req.query)
    .fields().filter().pagination().search('name').sort()
        
    let categories = await apiFeatures.query
    res.json({message:"success",page:apiFeatures.pageNumber,categories}) 
})

const getSingleCategory = catchError(async (req,res,next)=>{
     
    let category = await categoryModel.findById(req.params.id)
    !category && res.status(404).json({message:"Category not found"})
    category && res.json({message:"success",category})
})
const updateCategory = catchError(async (req,res,next)=>{
    if(req.file) req.body.image = req.file.filename
    if (req.body.name) req.body.slug = slugify(req.body.name) 
    
    let category = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !category && res.status(404).json({message:"Category not found"})
    category && res.json({message:"success",category})
    
})
const deleteCategory = deleteOne(categoryModel)

export {
    addCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}