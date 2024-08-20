import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'title is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short  title'],
        maxLength: [200, 'too long title'],
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'too short  desc'],
        maxLength: [1000, 'too long desc'],
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be greater than or equal to 0']
    },
    priceAfterDiscount: {
        type: Number,
        min: [0, 'Price must be greater than or equal to 0']
    },
    imgCover: String,
    images:[],
    quantity:{
        type: Number,
        required: true,
        min: [0, 'Quantity must be greater than or equal to 0']
    },
    rateAvg:{
        type: Number,
        min: [0, 'Rate must be greater than or equal to 0'],
        max: [5, 'Rate must be less than or equal to 5']
    },
    rateCount:{
        type: Number,
        min: [0, 'Rate count must be greater than or equal to 0']
    },
    sold: Number,
    category:{
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    subcategory:{
        type: mongoose.Types.ObjectId,
        ref: 'subcategory'
    },
    brand:{
        type: mongoose.Types.ObjectId,
        ref: 'brand'
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true, toJSON:{virtuals:true} })

schema.post('init',function(doc){
    if(doc.imgCover || doc.images){
        doc.imgCover = "http://localhost:3000/"+"uploads/"+ doc.imgCover
        doc.images = doc.images?.map((val) => "http://localhost:3000/" +"uploads/"+ val)
    }
    
})

schema.virtual('reviews',{
    ref: 'review',
    localField: '_id',
    foreignField: 'product'
})
schema.pre('findOne',function(){
    this.populate('reviews')
})

export const productModel = mongoose.model('product', schema)



