import {Router} from 'express'
import { cartController } from '../../controllers/cart.controller.js'


const router = Router()

const {getAll,update,changeCartQuantity,getByid,addProduct,deleteProduct,emptyCart} = new cartController
router.get('/',getAll)
router.get('/:cid',getByid)  
router.post('/',addProduct)
router.put('/:cid',update)
router.put('/:cid/products/:pid',changeCartQuantity)
router.delete('/:cid/products/:pid', deleteProduct)
router.delete('/:cid', emptyCart)


export default router