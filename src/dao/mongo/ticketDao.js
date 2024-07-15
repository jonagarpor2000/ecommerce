import { json } from "express";
import { ticketModel } from "./models/ticket.models.js";

export default class ticketMgMongo {
  constructor() {
      this.model = ticketModel
  }
  createTicket = async (cid, pid,quantity) => {
    return await this.model.findByIdAndUpdate({_id:cid},
        {$push:
            {products:{product: pid,quantity}}
        },{ new: true })
}

}
