import passport from 'passport'
import githubStrategy from 'passport-github2'
import {Strategy,ExtractJwt} from 'passport-jwt'
import { PRIVATE_KEY } from '../utils/jwt.js'
import { passportCall } from '../middlewares/passportCall.middleware.js'
import { cartService, userService} from '../service/index.js'




const JWTStrategy = Strategy
const JWTExtract =  ExtractJwt

const cookieExtractor = (req) => {
    let token = null
    if(req && req.cookies){
        token = req.cookies['token']
    }
    return token
}

const usrService = userService

export const initializePassport = () =>{

    passport.use('jwt',new JWTStrategy({
        jwtFromRequest: JWTExtract.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload,done) => { 
        try {
            return done(null,jwt_payload)
        } catch (error) {
            done(error)
        }
    }))

    passport.use('github', new githubStrategy({
        clientID:'Iv23liHCtKp3Svuicb9g',
        clientSecret:'8979b0a8dcf46a9adb0434246562409ca3b242ba',
        callbackURL:'http://localhost:8080/api/sessions/githubcallback'
    },async (accessToken,refreshToken,profile,done)=>{
        try {
            let user = await usrService.getBy({email: profile._json.email})
            if(!user){
                let newUser = {
                    first_name:profile._json.name.split(' ')[0],
                    last_name:profile._json.name.split(' ')[1],
                    email:profile._json.email,
                    password:'',
                    role:'user'
                }
                let newCart = await cartService.createEmpty()
                newUser.cartID = newCart._id
                let result = await usrService.create(newUser)
                done(null,result)
            }else{
                done(null,user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id, done)=>{
        try {
            const user = await usrService.getById(id)
            done(null,user)
        } catch (error) {
            done(error)
        }
    })
    
}

export const authentication = passportCall('jwt',{session:false})
