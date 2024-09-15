import TicketDto from "../dtos/ticket.dto.js"

export default class TicketRepository {
    constructor(TicketDao){
        this.dao = TicketDao
    }
    createTicket = async (ticketargs) =>{ 
        const newTicket = new TicketDto(ticketargs)
        return await this.dao.createTicket(newTicket)
    
    }
        
}