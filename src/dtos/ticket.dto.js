import { now } from "mongoose"
import crypto from 'crypto'

export default class TicketDto{
    constructor(ticket){
        this.code = crypto.randomUUID()
        this.purchase_datetime = now()
        this.amount = ticket.amount
        this.purchaser = ticket.purchaser
        this.products = ticket.products
    }
}