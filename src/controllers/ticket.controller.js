
import { objConfig } from "../config/index.js"
import { cartService, productService, ticketService } from "../service/index.js"

export default class ticketController {
    ticketPost = async (req,res) =>{
        const {cid} = req.params
        try {
            
            const cart = await cartService.getById(cid)
        
            if(!cart){
                return res.status(401).json({status:'error',payload:'Cart not found'})
            }
            const productNotPurchased = []
      
            for(let item of cart.products){
                const product = item.product
                const quantity = item.quantity
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
            const ticket = await ticketService.createTicket({
                products: cart.products,
                purchaser: req.user,
                amount: Totalamount
            })
    
            if(productNotPurchased.length> 0){
                let prodstoBuy = cart.products.filter(item=>!productNotPurchased.includes(cart._id,item.product._id)).map(item => item.product[0]._id.toString())
                await cartService.deleteProductOnCart((cid,prodstoBuy))
                
            }else{
                await cartService.empty(cid)
            }
    
            res.status(200).json({
                status:'success',
                messege:'Purchase completed successfully',
                productNotPurchased,
                ticket
            })
        } catch (error) {
            //req.logger.error(`Ticket can't be generated, because: ${error}`)
            console.log(error)
            return res.json( {status:'error',payload:'Error generating ticket' })
        }
    }

    ticketSendMail = async (req,res) =>{
        try {
            const user = {
                first_name: 'test',
                last_name:'tested',
                email: req.user
            }
            

        } catch (error) {
            
        }
    }

}
