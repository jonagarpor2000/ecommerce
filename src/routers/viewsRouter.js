import { Router, json } from 'express'
import cartsview from './views/carts.view.router.js'
import productsview from './views/products.view.router.js'
import { authorization } from '../middlewares/authorization.middleware.js'
import { authentication } from '../config/passport.config.js'
const router = Router()



router.get('/login', (req, res) => {
    res.render('login',{authorization})
})

router.get('/register', (req, res) => {
    res.render('register')
})


router.use('/products',productsview)
router.use('/carts',cartsview)
router.get('/chat',await authentication,await authorization('user'),async (req, res) => {
    res.status(200).send('Ruta en desarrollo')
})




export default router