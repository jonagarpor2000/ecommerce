import {Router} from 'express'
import { cartMg } from '../../dao/mongo/cartdao.js'

const router = Router()

const CartService = new cartMg()
router.get('/',async(req,res)=>{
    const carts = await CartService.getCarts()
    res.send({status:"success",payload:carts})
})
router.get('/:cid',async(req,res)=>{
    const {cid} = req.params
    let result = await CartService.getCartById(cid)
    console.log(result)
    res.render('carts',{
        cart: result
    })
})

export default router

/**
 * <p> Descripcion: {{products.product.description}}</p>
<p> Precio: {{products.product.price}}</p>
<p> Estado: {{products.product.status}}</p>
<p> Categoria: {{products.product.category}}</p>
<p> Thumbnail: {{products.product.thumbnail}}</p>
<p> Codigo de producto: {{products.product.code}}</p>
<p> Stock: {{products.product.stock}}</p>
 */