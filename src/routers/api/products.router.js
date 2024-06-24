import {Router, query} from 'express'
import { productController } from '../../controllers/product.controller.js'


const router = Router()
const {getProducts,getProductById,addProduct,deleteProduct,updateProduct} = new productController()
router.get('/',getProducts)
router.get('/:pid',getProductById)
router.post('/',addProduct)
router.put('/:pid',updateProduct)
router.delete('/:pid', deleteProduct)
export default router