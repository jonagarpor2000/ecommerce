
import { objConfig } from "../config/index.js"
import { cartService, productService, ticketService } from "../service/index.js"
import { extractfields } from "../utils/jwt.js"
import { mailController } from "./mail.controller.js"

export default class ticketController {
    ticketPost = async (req,res) =>{
        const {cid} = req.params

        let data ={
            address: extractfields(req.cookies.token).user.email,
            products: [],
            order: {
                code: null,
                amount: null,
                
            }
        }
        try {
            let productsToadd = []
            const cart = await cartService.getById(cid)
        
            if(!cart){
                return res.status(401).json({status:'error',payload:'Cart not found'})
            }
            const productNotPurchased = []
      
            for(let item of cart.products){
                const product = item.product
                const quantity = item.quantity
                productsToadd = data.products.push({product})
                data.products[productsToadd - 1].quantity = quantity;
                const stock = await productService.getStock(product._id)
                
                if(quantity>stock){
                    productNotPurchased.push(product._id)
                }else{
                    await productService.updateStock(product._id, stock - quantity)
                }
    
            }
    
             
    
            let products = cart.products.map(item => item.product.map(el => el.price))
            let quantity = cart.products.map(item => item.quantity)
            let Totalamount = products.map((element1, index) => element1 * quantity[index]);
            Totalamount = Totalamount.reduce((a, b) => a + (b || 0), 0)
            data.order.amount = Totalamount
            
            const ticket = await ticketService.createTicket({
                products: cart.products,
                purchaser: data.address,
                amount: Totalamount
            })
            data.order.code = ticket.code
            if(productNotPurchased.length> 0){
                let prodstoBuy = cart.products.filter(item=>!productNotPurchased.includes(cart._id,item.product._id)).map(item => item.product[0]._id.toString())
                await cartService.deleteProductOnCart(cid,prodstoBuy)
                
            }else{
                await cartService.empty(cid)
            }
            await this.ticketSendMail(data)
            res.status(200).json({
                status:'success',
                messege:'Purchase completed successfully',
                productNotPurchased,
                ticket
            })
        } catch (error) {
            req.logger.error(`Ticket can't be generated, because: ${error}`)
            return res.json( {status:'error',payload:'Error generating ticket' })
        }
    }

    ticketSendMail = async (data) =>{
        try {
            const mail = new mailController()
            mail.send_order(data)

        } catch (error) {
            req.logger.error(`Error sending mail ${error}`)
        }
    }

}
