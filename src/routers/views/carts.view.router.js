import {Router} from 'express'

const router = Router()

router.get('/',async(req,res)=>{
    const {cid} = req.params
    let result = await fetch(`http://127.0.0.1:8080/api/carts`) // Esto retorna HTML/ Tal vel usar header
        .then(response => response.json())
        .then(data => {return data})
        res.render('carts',{
            cart: result.payload.products
        })
})
router.get('/:cid',async(req,res)=>{
    const {cid} = req.params
    let result = await fetch(`http://127.0.0.1:8080/api/carts/${cid}`) // Esto retorna HTML/ Tal vel usar header
        .then(response => response.json())
        .then(data => {return data})
        console.log(result)
    res.render('carts',{
        cart: result.payload
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