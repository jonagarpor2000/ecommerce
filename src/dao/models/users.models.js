import { Schema, model }  from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'users'

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: String,
    email: {
        type: String,
        required: true, 
        unique: true,
        index:true
    },
    age:Number,
    password: String,
    cartID:{
        type: Schema.Types.ObjectId,
        ref: "carts",
      }, 
    role:{
        type: String,
        enum:['user','admin'],
        default: 'user'
    }
})

userSchema.plugin(mongoosePaginate)

export const userModel = model(userCollection, userSchema)