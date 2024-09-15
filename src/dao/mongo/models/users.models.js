import { Schema, model, now }  from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'users'
/***
 * @typedef {Object} userSchema
 *  @property {string} first_name firstname of user
 *  @property {string} last_name firstname of user
 *  @property {string} email mail of user
 *  @property {number} age User's age
 *  @property {string} password mail of user
 *  @property {string} cartID Cart asociated with user
 *  @property {string} role role of user
 *  @property {Array} document documents uploaded by users: name and reference
 */
const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true, 
        unique: true,
        index:true
    },
    birthDate:{
      type:Date,
      min: Date.now-18*365*24*60*60*1000,

    },
    password: String,
    cartID:{
        type: Schema.Types.ObjectId,
        ref: "carts",
      }, 
    role:{
        type: String,
        enum:['user','admin','premium'],
        default: 'user'
    },
    lastActive:Date,
    documents: 
      { type:[{

        name:[{
          type: String,
          required: true
        }], 
        reference: { type: String,
           required: true}
        }]
      }
})

userSchema.plugin(mongoosePaginate)

export const userModel = model(userCollection, userSchema)