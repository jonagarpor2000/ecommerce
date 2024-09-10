// session -> login - register - logout
import {isValidPassword } from '../utils/bcrypt.js'
import { generateToken } from '../utils/jwt.js'
import { userService } from '../service/index.js'
import { logger } from '../utils/logger.js'
import { userController } from './user.controller.js'
import { CustomError } from '../utils/errors/error.js'
import { generateUserError } from '../utils/errors/info.js'
import { EError } from '../utils/errors/enums.js'





export class authController {

    constructor(){
        this.userController = new userController()
        this.token = null
    }
/**
 * Generates a JWT token with user information.
 *
 * @param {string} email - The user's email.
 * @param {string} _id - The user's unique identifier.
 * @param {string} role - The user's role.
 * @param {string} fullname - The user's full name.
 *
 * @returns {string} A JWT token containing the user's information.
 */
generictoken = (email, _id, role, fullname) => {
    this.token = generateToken({
        email,
        _id,
        role,
        fullname
    });
}
    registerUser = async (req, res) => {
        const {first_name, last_name, email,password} = req.body
        logger.info(`From body of session ${first_name} ${last_name} ${email} ${password}`)
        try{
        if(!first_name||!last_name||!email ||!password) return res.json({status: 'error', error: 'se deben completar campos pendientes'})

        let result = await this.userController.createUser(req,res)

        if(!(result.status === 'success')){
            CustomError.createError({
               name:'Error getting user',
               cause: generateUserError(result),
               message:'Error getting user from DAO in session',
               code: EError.INVALID_TYPES_ERROR,
               
            })   
           }
        const {_id,role,email,fullname} = result.payload
        
        this.generictoken(_id,role,email,fullname)

        res.cookie('token', this.token, {httpOnly: true, maxAge: 60*60*24}).json({status: 'success', message:' usuario registrado'})
        }catch(e){
            logger.error(`User can't be created in session, because: ${e}`)
            res.json({status: 'error', error: 'error al registrar usuario'})
        }
    }


    loginUser = async(req, res) => {
        const {email, password} = req.body
        const userFound = await userService.getBy({email})
        if(!password || !email) return res.status(401).send({status: 'error', error: 'empty credentials'})
        if(!isValidPassword(password,{password: userFound.password})) return res.status(401).send({status: 'error', error: 'login failed'})
    
        
        const{_id,role,fullname} = userFound
        this.generictoken(_id,role,email,fullname)
        res.cookie('token', this.token, {httpOnly: true, maxAge: 60*60*24}).redirect('/products')
    }


    logingithubUser = async(req,res)=>{
        const {email,_id,role,first_name,last_name} = req.user
        let fullname = `${first_name} ${last_name}`    
        this.generictoken(_id,role,email,fullname)
        return res.cookie('token', this.token, {httpOnly: true, maxAge: 60*60*24}).redirect('/products')
    }


    logout = async (req, res) => {
        
        res.clearCookie('token').redirect('/login')

    }

    current = async (req, res) => {
        res.send(`Hola ${req.user.user} los datos son clasificados`)
    }


}