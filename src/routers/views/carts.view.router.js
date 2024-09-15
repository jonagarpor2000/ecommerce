import {Router} from 'express'
import { authentication } from '../../config/passport.config.js'
import { authorization } from '../../middlewares/authorization.middleware.js'


const router = Router()

router.get('/', await authentication,await authorization('admin'),async(req,res)=>{
    const {cid} = req.params
    let result = await fetch(`http://127.0.0.1:8080/api/carts`)
        .then(response => response.json())
        .then(data => {return data})
        res.render('carts',{
            cart: result.payload.products
        })
})
router.get('/:cid',await authentication,async(req,res)=>{
    const {cid} = req.params

    let result = await fetch(`http://127.0.0.1:8080/api/carts/${cid}`)
        .then(response => response.json())
        .then(data => {return data})
    res.render('cart-buy',{
        cart: result.payload.products
    })
})

export default router
