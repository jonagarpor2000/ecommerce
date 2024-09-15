import { Schema, model, now }  from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const sessionCollection = 'sessions'
/***
 * @typedef {Object} userSchema
 *  @property {string} _id sesion id
 *  @property {string} expires date of expiration
 *  @property {string} session cookie session
 */
const sessionSchema = new Schema({
    session: JSON,
   
},{ timestamps: true })

export const sessionsModel = model(sessionCollection, sessionSchema)