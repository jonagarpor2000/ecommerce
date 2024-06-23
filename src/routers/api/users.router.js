import {Router, query} from 'express'
import { userController } from '../../controllers/user.controller.js'



const router = Router()
const {getUsers,getUser,createUser,updateUser,deleteUser} = new userController()


router.get('/', getUsers)
router.get('/:uid', getUser)
router.post('/', createUser)
router.put('/:uid', updateUser)
router.delete('/:uid', deleteUser)

export default router