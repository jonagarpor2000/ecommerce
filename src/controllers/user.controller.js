import { cartService, userService } from "../service/index.js"
import { createHash } from "../utils/bcrypt.js"
import { EError } from "../utils/errors/enums.js"
import { CustomError } from "../utils/errors/error.js"
import { duplicateUserindbError, generateUserError } from "../utils/errors/info.js"
import { logger } from "../utils/logger.js"


class userController {
    constructor() {
        this.userService = userService
        this.cartService = cartService
    }
     getUsers = async(req, res) => {
        try {
            let {page,limit} = req.query
            page = page != undefined ? page : 1;
            limit = limit != undefined ? limit : 10;
            const usersFounded = await this.userService.getAll(limit,page)
            res.json({status:'success', payload: usersFounded})
            
        } catch (error) {
            req.logger.error(`Users can't be listed, because: ${error}`)
            return res.json({status:'error',payload:'Error showing users'})    
        }
    }
     getUser = async (req, res) => {
        const {uid} = req.params
        try {
            const userFound = await this.userService.getBy({_id:uid})
            res.json({status:'success', payload: userFound})
        } catch (error) {
            req.logger.error(`User can't be found, because: ${error}`)
            return res.json({status:'error',payload:'Error finding user'})
        }
        
    }     
    getUserBy = async (req, res) => {
        const {filter} = req.query
        try {
            const userFound = await this.userService.getUserBy(filter)
            res.json({status:'success', payload: userFound})
        } catch (error) {
            req.logger.error(`User can't be found, because: ${error}`)
            return res.json({status:'error',payload:'Error finding user'})
        }
        
    }

    createUser = async (req,res) => {
        const {first_name, last_name, email,password} = req.body  
        try {
        logger.info(`Loading user ${first_name} ${last_name} ${email} ${password} from DAO`)
        if(!first_name || !last_name || !email|| !password){
         CustomError.createError({
            name:'Error al crear usuario',
            cause: generateUserError({first_name,last_name,email,password}),
            message:'Error al crear usuario por campos invalidos o faltantes',
            code: EError.INVALID_TYPES_ERROR,
            
         })   
        }
        let existUsr = await this.userService.getBy({email})
        if(existUsr){
            CustomError.createError({
                name:'Duplicate user',
                cause: duplicateUserindbError(email),
                message:'User already exists',
                code: EError.DUPLICATE_ENTRY_ERROR,
                
             })   
        }
        const newCart = await this.cartService.createEmpty()
        logger.info(`User's cart: ${newCart}`)
        const newUser = {first_name,last_name,email,cartID:newCart._id,password: await createHash(password)}
        let userCreated = await this.userService.create(newUser)
        logger.warning(`User created at DAO: ${userCreated}`)
        return {status:'success', payload: userCreated}
       } catch (error) {
         if(error.code==11000){
            CustomError.createError({
                name:'Database creating user',
                cause: duplicateUserindbError(email),
                message:'User already exists',
                code: EError.DATABASE_ERROR,
                
             })   
         } 
            logger.error(`User can't be created at controller, because: ${error}`)
            return {status:'error',payload:'Error creating user'}
       }
        
    }
    
    updateUser = async (req,res) => { //Pending
        const {first_name,last_name,email,age,cart,role,password,} = req.body
        const newUser = {first_name,last_name,email,age,cart,role,password,}
        try {
            const userCreated = await this.userService.createUser(newUser)
            res.send({status:'success', payload: userCreated})
        } catch (error) {
            req.logger.error(`User can't be updated, because: ${error}`)
            return json({status:'error',payload:'Error updating user'})
        }
    }
    
    deleteUser = async (req,res) => {
        const {uid} = req.body
        try {
            const userDeleted = await this.userService.deleteUser(uid)
            res.send({status:'success', payload: userDeleted})
            
        } catch (error) {
            req.logger.error(`User can't be deleted, because: ${error}`)
            return res.json({status:'error',payload:'Error deleting user'})
        }
    }

    deleteinactiveusers = async (req,res) => {
        try {
            const userDeleted = await this.userService.deleteinactive()
            res.send({status:'success', payload: userDeleted})
            
        } catch (error) {
            req.logger.error(`User can't be deleted, because: ${error}`)
            return res.json({status:'error',payload:'Error deleting user'})
        }
    }


}
export {userController}