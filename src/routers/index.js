import {Router} from 'express'
import apiRouter from './apiRouter.js'
import viewsRouter from './viewsRouter.js'

const router = Router()
router.use('/api', apiRouter)
router.use('/', viewsRouter)

export default router