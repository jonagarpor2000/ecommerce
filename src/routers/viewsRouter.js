import { Router, json } from 'express'
import productsRouter from './api/products.router.js'
import productsview from './products.view.router.js'
import cartsRouter from './api/carts.router.js'
import usersRouter from './api/users.router.js'
import { sessionsRouter } from './api/sessions.router.js'
import { authorization } from '../middlewares/authorization.middleware.js'
const router = Router()



router.get('/login', (req, res) => {
    res.render('login',{authorization})
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.use('/api/products',productsRouter)
router.use('/products',productsview)
router.use('/api/carts',cartsRouter)
router.use('/api/users',usersRouter)
router.use('/api/sessions',sessionsRouter)


export default router