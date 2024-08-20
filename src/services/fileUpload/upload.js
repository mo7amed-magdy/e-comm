import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from './../../utils/appError.js';
import mongoose from 'mongoose';



const fileUpload =  () =>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      
      // cb(null, uuidv4()+"-"+file.originalname)
      cb(null,new mongoose.Types.ObjectId + "-"+ file.originalname)
    }
  })
  
  function fileFilter(req,file,cb) {
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new AppError('image only',401) , false)
    }
    
  }
  const upload = multer({ storage,fileFilter })
  return upload
}

export const uploadSingleFile = fieldName=>  fileUpload().single(fieldName)

export const uploadArrayOfFiles = fieldName=> fileUpload().array(fieldName,10)

export const uploadFields = fields=> fileUpload().fields(fields)




// app.post('/photo',uploadArrayOfFiles('img'),(req,res)=>{
//     let images = req.files.images.map((val)=> val.filename)
// req.body.img = req.files.img[0].filename
//     req.body.images = images
//     photoModel.insertMany(req.body)
//     res.json({message:'success'})

// })


// import { v2 as cloudinary } from 'cloudinary';

// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: 'didtiaqgl', 
//         api_key: '347577137761927', 
//         api_secret: 'Ks5KnSxuYq-rpPOsVPg-299771U' // Click 'View Credentials' below to copy your API secret
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(req.files.img[0].path,null,async (err,result) =>{
//         req.body.img = result.secure_url
//         await photoModel.insertMany(req.body)
//         res.json({message:"success"})
//        })
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();