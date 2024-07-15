
import { cartService, productService } from "../service/index.js"

export default class ticketController {
    ticketPost = async (req,res) =>{
        const {cid} = req.params
        const cart = await cartService.getBy({id:cid})
    
        if(!cart){
            return res.status(401).json({status:'error',payload:'Cart not found'})
        }
        const productNotPurchased = []
        for(item of cart.products){
            const product = item.product
            const quantity = item.quantity
            const stock = await productService.getStock(product._id)
            
            if(quantity>stock){
                productNotPurchased.push(product._id)
            }else{
                await productService.updateStock(product._id, stock - quantity)
            }

        }

        const ticket = await ticketService.createTicket({
            products: cart.products,
            purchaser: req.user,
            amount: products.stock.reduce((a, b) => a + b, 0)
        })

        console.log(`Monto de factura total: ${ticket.amount}`)

        if(productNotPurchased.length> 0){
            await cartService.updateProducts(cid,cart.products.filter(item=>!productNotPurchased.includes(item.product._id)))
        }else{
            await cartService.empty(cid)
        }

        res.status(200).json({
            status:'success',
            messege:'Purchase completed successfully',
            productNotPurchased,
            ticket
        })
    }

}
