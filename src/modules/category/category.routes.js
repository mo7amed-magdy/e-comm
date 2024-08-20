import express from "express"
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "./category.controller.js"
import { validation } from './../../middleware/validation.js';
import { addCategoryVal, paramsIdVal, updateCategoryVal } from "./category.validation.js";
import { uploadSingleFile } from "../../services/fileUpload/upload.js";
import subCategoryRouter from './../subcategory/subcategory.routes.js';
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";


const categoryRouter = express.Router()

categoryRouter.use('/:category/subcategories',subCategoryRouter)
categoryRouter.route('/')
.post(protectedRoutes,allowedTo('user'),uploadSingleFile('img'),validation(addCategoryVal),addCategory)
.get(getAllCategories)

categoryRouter.route('/:id')
.get(validation(paramsIdVal),getSingleCategory)
.put(uploadSingleFile('img'),validation(updateCategoryVal),updateCategory)
.delete(validation(paramsIdVal),deleteCategory)


export default categoryRouter