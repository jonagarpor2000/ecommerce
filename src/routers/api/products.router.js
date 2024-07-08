import {Router, query} from 'express'
import { productController } from '../../controllers/product.controller.js'


const router = Router()
const {getAll,getById,add,update,deleteprod} = new productController()
router.get('/',getAll)
router.get('/:pid',getById)
router.post('/',add)
router.put('/:pid',update)
router.delete('/:pid', deleteprod)
export default router