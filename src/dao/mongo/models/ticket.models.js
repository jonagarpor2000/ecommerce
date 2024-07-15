import { Schema, model }  from "mongoose"

const ticketCollection = 'tickets'

const ticketSchema = new Schema({
    code: String,
    purchase_datetime: {
        type: Date,
        index: true
    },
    amount: Number,
    purchaser:{
        type: String,
        ref: "user",
      },
      products:[{
        type: Schema.Types.ObjectId,
        ref: "products",
      }],
})

export const ticketModel = model(ticketCollection, ticketSchema)