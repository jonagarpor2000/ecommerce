import { Schema, model }  from "mongoose"

const ticketCollection = 'tickets'

const ticketSchema = new Schema({
    code:Number(Math.random()),
    purchase_datetime: {
        type: Date,
        index: true
    },
    amount: Number,
    purchaser:{
        type: Schema.Types.String,
        ref: "user",
      }, 
})

export const ticketModel = model(ticketCollection, ticketSchema)