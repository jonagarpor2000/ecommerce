import {Router, query} from 'express'
import { logger } from '../../utils/logger.js';
import { objConfig } from '../../config/index.js';
import { extractfields } from '../../utils/jwt.js';



const router = Router()
router.get('/',async(req,res)=>{
    let {page,limit,query,sort} = req.query
        page = page != undefined ? page : 1;
        limit = limit != undefined ? limit : 10;
        query = query != undefined ? {category:query} : {};
        sort = sort === "asc" ? 1 : sort === "desc" ? -1 : 0;
    try {
        //`http://localhost:8080/api/products/page=${page}&limit=${limit}&query=${query}&sort=${sort}
        let prods = await fetch(`http://127.0.0.1:8080/api/products?page=${page}&limit=${limit}`) // Esto retorna HTML/ Tal vel usar header
        .then(response => response.json())
        .then(data => {return data})
        res.render('products',{
            products: prods.payload
        })

        
    } catch (error) {
        console.log(error.message)
    }
    
})

router.get('/:pid',async(req,res)=>{
    let {pid} = req.params

    
    try {
    let cart = null
    if(req.cookies.token){
        const data = extractfields(req.cookies.token)
        let uid = data.user._id
        console.log(uid)
        let cid = await fetch(`http://127.0.0.1:8080/api/users/${uid}`)
        .then(response => response.json())
        .then(data => {return data})
        cart = cid.payload.cartID
        req.logger.info(`Cart Id at product view: ${cart}`)
        
    }
    
    let prod = await fetch(`http://127.0.0.1:8080/api/products/${pid}`)
        .then(response => response.json())
        .then(data => {return data})
    res.render('product',{cart,product: prod.payload})

        
    } catch (error) {
        logger.error(error.message)
        res.render('product',{error: 'falla en la carga del producto'})
    }
    
})

export default router