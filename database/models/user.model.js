import mongoose from "mongoose";
import bcrypt from "bcrypt"

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'too short userName']
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minLength: [8, 'password should be at least 8 characters long']
    },
    isActive:{
        type: Boolean,
        default: true
    },
    isBlocked:{
        type: Boolean,
        default: false
    },
    verifyEmail:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    passwordChangedAt: Date,
    wishList:[{type:mongoose.Types.ObjectId,ref:'product'}],
    addresses:[
        {   street:String,
            city:String,
            phone:String
        }
    ]
    
}, { timestamps: true })

schema.pre('save',function(){
   if(this.password) this.password = bcrypt.hashSync(this.password,8)
})
schema.pre('findOneAndUpdate',function(){
   if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password,8)
})

export const userModel = mongoose.model('user', schema)



