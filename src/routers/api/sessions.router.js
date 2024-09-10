// session -> login - register - logout
import {Router} from 'express'
import {authorization} from '../../middlewares/authorization.middleware.js'
import { authController } from '../../controllers/sessions.controller.js'
import { passportCall } from '../../middlewares/passportCall.middleware.js'
import { authentication } from '../../config/passport.config.js'

export const sessionsRouter = Router()

const {registerUser,loginUser,logingithubUser,logout,current} = new authController
sessionsRouter.post('/register', registerUser)
sessionsRouter.post('/login', loginUser)
sessionsRouter.get('/github', passportCall('github',{scope: 'user:email'}))
sessionsRouter.get('/githubcallback', passportCall('github',{failureRedirect:'/login'}),logingithubUser)
sessionsRouter.get('/logout',logout)
sessionsRouter.get('/current',await authentication,await authorization('admin'),current)
