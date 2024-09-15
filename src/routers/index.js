import {Router} from 'express'
import apiRouter from './apiRouter.js'
import viewsRouter from './viewsRouter.js'
//import pruebasRouter from './pruebas/pruebas.router.js'

const router = Router()
router.use('/api', apiRouter)
router.use('/', viewsRouter)
//router.use('/pruebas', pruebasRouter)
router.get('/loggerTest',async (req,res) => {
    req.logger.fatal('Alerta fatal!')
    req.logger.error('Error log test!')
    req.logger.warning('Warning log test!')
    req.logger.info('Information log test!')
    req.logger.http('http log alert test!')
    req.logger.debug('Debug log test error!')
    res.status(200).send('logs')
})


export default router