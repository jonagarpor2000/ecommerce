import {Router} from 'express'

import ticketController from '../../controllers/ticket.controller.js'


const router = Router()

const {ticketPost} = new ticketController()
router.post('/:cid/purchase',ticketPost)


export default router