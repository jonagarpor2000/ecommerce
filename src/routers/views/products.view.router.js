import {Router, query} from 'express'
import { prodMg } from '../../dao/mongo/prodDao.js'


const router = Router()
const product = new prodMg()
router.get('/',async(req,res)=>{
    let {numPage,limit,query,sort} = req.query
    try {
        const prods = await product.getProducts(numPage,sort,limit,query)
        res.render('products',{
            products: prods
        })
        
    } catch (error) {
        console.log(error.message)
    }
    
})

export default router