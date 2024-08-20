import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        required: true,
    },
    expires:Date,
    discount: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
    
    
}, { timestamps: true })


export const couponModel = mongoose.model('coupon', schema)



