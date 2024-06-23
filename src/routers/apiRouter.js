import { Router, json } from 'express'
import productsRouter from './api/products.router.js'
import cartsRouter from './api/carts.router.js'
import usersRouter from './api/users.router.js'
import { sessionsRouter } from './api/sessions.router.js'
const router = Router()

router.use('/products',productsRouter)
router.use('/carts',cartsRouter)
router.use('/users',usersRouter)
router.use('/sessions',sessionsRouter)


export default router