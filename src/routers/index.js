import {Router} from 'express'
import apiRouter from './apiRouter.js'
import viewsRouter from './viewsRouter.js'
//import pruebasRouter from './pruebas/pruebas.router.js'

const router = Router()
router.use('/api', apiRouter)
router.use('/', viewsRouter)
//router.use('/pruebas', pruebasRouter)

export default router