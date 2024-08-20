import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId , ref: 'user'},
    orderItems: [{
        product: { type: mongoose.Types.ObjectId, ref: 'product' },
            quantity: Number,
            price: Number,
        }],
    shippingAddress: {
        street:String,
        city:String,
        phone:String
    },
    totalOrderPrice: Number,
    paymentMethod:{
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    isDelivered:{
        type: Boolean,
        default: false
    },
    paidAt:{
        type: Date
    }

},{ timestamps: true})

export const orderModel = mongoose.model('order',schema)