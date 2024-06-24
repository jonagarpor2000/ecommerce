import {Router} from 'express'
import { cartMg } from '../../dao/mongo/cartdao.js'

const router = Router()

const CartService = new cartMg()
router.get('/',async(req,res)=>{
    const carts = await CartService.getCarts()
    res.json({status:"success",payload:carts})
})
router.get('/:cid',async(req,res)=>{
    const {cid} = req.params
    let result = await CartService.getCartById(cid)
    if(result instanceof Error){
        res.json({status:'Error',payload:result.message})
    }else{
        res.json({status:'Success',payload:result})
    }
})  
router.post('/',async (req,res)=>{
    const {body} = req
    const {cid,pid,quantity} = body
    let result = await CartService.addProductToCart(cid,pid,quantity)
    res.json({status:'Success',payload:result})
})
router.put('/:cid',async(req,res)=>{
    const {cid} = req.params
    let result = await CartService.updateCart(cid)
    if(result instanceof Error){
        res.json({status:'Error',payload:result.message})
    }else{
        res.json({status:'Success',payload:result})
    }
})
router.delete('/:cid/products/:pid', async(req,res)=>{
    const {cid,pid} = req.params
    let result = await CartService.deleteProductOnCart(cid,pid)
    if(result instanceof Error){
        res.json({status:'Error',payload:result.message})
    }else{
        res.json({status:'Success',payload:result})
    }
    
    
})

router.delete('/:cid', async(req,res)=>{
    const {cid} = req.params
    let result = await CartService.emptyCart(cid)
    if(result instanceof Error){
        res.json({status:'Error',payload:result.message})
    }else{
        res.json({status:'Success',payload:result})
    }
})


export default router