// session -> login - register - logout
import {Router} from 'express'
import { UsersManagerMongo } from '../../dao/usrMg_db.js'
import {authorization} from '../../middlewares/authorization.middleware.js'
import { createHash, isValidPassword } from '../../utils/bcrypt.js'
import passport from 'passport'
import { passportCall } from '../../middlewares/passportCall.middleware.js'
import { generateToken } from '../../utils/jwt.js'
import { authentication } from '../../config/passport.config.js'


export const sessionsRouter = Router()

const userService = new UsersManagerMongo

sessionsRouter.post('/register', async (req, res) => {
    const {first_name, last_name, email,password} = req.body
    try{
    if(!email ||!password) return res.status(401).send({status: 'error', error: 'se deben completar campos pendientes'})


    const userExist = await userService.getUserBy({email})
    if(userExist) return res.status(401).send({status: 'error', error: 'usuario ya existente'})
   const newUser = {
        first_name,
        last_name,
        email,
        password: await createHash(password),
    }

    const result = await userService.createUser(newUser)
    const token = generateToken({
        email,
        id: result._id,
        role: result.role
    })

    res.cookie('token', token, {httpOnly: true, maxAge: 1000*60*60*24}).send({status: 'success', message:' usuario registrado'})
    res.send('user registered')
    }catch(e){
        console.log(e)
        res.status(401).send({status: 'error', error: 'error al registrar usuario'})
    }
})


sessionsRouter.post('/login', async(req, res) => {
    const {email, password} = req.body
    const userFound = await userService.getUserBy({email})
    if(!password || !email) return res.status(401).send({status: 'error', error: 'empty credentials'})
    if(!isValidPassword(password,{password: userFound.password})) return res.status(401).send({status: 'error', error: 'login failed'})
   
    
    const token = generateToken({
        email,
        id: userFound._id,
        role: userFound.role
    })
    console.log(`Tengo cosas ${userFound}`)
    res.cookie('token', token, {httpOnly: true, maxAge: 1000*60*60*24})
})


sessionsRouter.get('/github', passportCall('github',{scope: 'user:email'}),async(req,res)=>{
    const {email,id,role} = await userService.getUserBy({email: profile._json.email})       
        const token = generateToken({
                    email,
                    id,
                    role
                })
                res.cookie('token', token, {httpOnly: true, maxAge: 1000*60*60*24})
                
                
} )
sessionsRouter.get('/githubcallback', passportCall('github',{failureRedirect:'/login'}),async(req,res)=>{
    res.redirect('/products')
} )


sessionsRouter.get('/logout', (req, res) => {
    
    res.cookie('token').destroy()
    req.session.destroy
    return res.redirect('/login')

})

sessionsRouter.get('/current',await authentication,await authorization('admin'),(req, res) => {
     for (const [key, value] of Object.entries(req.user.user)) {
            console.log(`${key}: ${value}`);
          }
    res.send(`Hola ${req.user.user} los datos son clasificados`)
})


sessionsRouter.get('/profile', (req, res) => {
    res.send('No esta autenticado')
})
