import {Router, query} from 'express'


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
        console.log(prods)
        res.render('products',{
            products: prods.payload
        })

        
    } catch (error) {
        console.log(error.message)
    }
    
})

export default router