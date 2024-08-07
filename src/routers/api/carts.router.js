import {Router} from 'express'
import { cartController } from '../../controllers/cart.controller.js'


const router = Router()

const {getAll,update,changeCartQuantity,getByid,addProduct,deleteProduct,emptyCart} = new cartController
router.get('/',getAll)
router.post('/',addProduct)
router.get('/:cid',getByid)  
router.put('/:cid',update)
router.delete('/:cid', emptyCart)
router.put('/:cid/products/:pid',changeCartQuantity)
router.delete('/:cid/products/:pid', deleteProduct)


export default router