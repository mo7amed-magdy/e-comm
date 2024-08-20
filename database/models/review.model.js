import mongoose from "mongoose";

const schema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'too short review']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    rate:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, { timestamps: true })

schema.pre(['find','findOne'],function(){
    this.populate('user','name -_id')
})

export const reviewModel = mongoose.model('review', schema)



