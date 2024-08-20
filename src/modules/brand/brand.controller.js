
import slugify from 'slugify';
import { catchError } from './../../middleware/catchError.js';
import { brandModel } from './../../../database/models/brand.model.js';
import { deleteOne } from '../handlers/handlers.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';

const addBrand = catchError(async (req,res,next)=>{
        req.body.logo = req.file.filename
        req.body.slug = slugify(req.body.name) 
        let brand = new brandModel(req.body)
        await brand.save() 
        res.json({message:"success",brand}) 
    })
const getAllBrands = catchError(async (req,res,next)=>{
     
    let apiFeatures = new ApiFeatures(brandModel.find(),req.query)
    .fields().filter().pagination().search('name').sort()
        
    let brands = await apiFeatures.query
    res.json({message:"success",page:apiFeatures.pageNumber,brands}) 
})

const getSingleBrand = catchError(async (req,res,next)=>{
     
    let brand = await brandModel.findById(req.params.id)
    !brand && res.status(404).json({message:"brand not found"})
    brand && res.json({message:"success",brand})
})
const updateBrand = catchError(async (req,res,next)=>{
    if(req.file) req.body.logo = req.file.filename
    if (req.body.name) req.body.slug = slugify(req.body.name) 
    
    let brand = await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !brand && res.status(404).json({message:"brand not found"})
    brand && res.json({message:"success",brand})
    
})
const deleteBrand = deleteOne(brandModel)

export {
    addBrand,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand,
 
}