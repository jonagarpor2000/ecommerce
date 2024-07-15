import { json } from "express";
import { ticketModel } from "./models/ticket.models.js";

export default class ticketMgMongo {
  constructor() {
      this.model = ticketModel
  }
  createTicket = async (ticket) => {
    return await this.model.create(ticket)
}

}
