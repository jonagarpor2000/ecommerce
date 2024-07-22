
import { userService } from "../service/index.js"
import { EError } from "../utils/errors/enums.js"
import { CustomError } from "../utils/errors/error.js"


class userController {
    constructor() {
        this.userService = userService
    }
     getUsers = async(req, res) => {
        try {
            
            const usersFounded = await this.userService.getUsers()
            res.json({status:'success', payload: usersFounded})
            
        } catch (error) {
            req.logger.error(`Users can't be listed, because: ${error}`)
            return res.json({status:'error',payload:'Error showing users'})    
        }
    }
     getUser = async (req, res) => {
        const {uid} = req.params
        try {
            const userFound = await this.userService.getUserBy({_id:uid})
            res.json({status:'success', payload: userFound})
        } catch (error) {
            req.logger.error(`User can't be found, because: ${error}`)
            return res.json({status:'error',payload:'Error finding user'})
        }
        
    }

    createUser = async (req,res) => {
       try {
        const {first_name,last_name,email,age,cart,role,password,} = req.body
        if(!first_name || !last_name || !email){
         CustomError.createError({
            name:'Error al crear usuario',
            cause: generateUserError({first_name,last_name,email,age,cart,role,password}),
            message:'Error al crear usuario por campos invalidos o faltantes',
            code: EError.INVALID_TYPES_ERROR,
            
         })   
        }
        const newUser = {first_name,last_name,email,age,cart,role,password,}
        const userCreated = await this.userService.createUser(newUser)
        res.send({status:'success', payload: userCreated})
       } catch (error) {
            req.logger.error(`User can't be created, because: ${error}`)
            return res.json({status:'error',payload:'Error creating user'})
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
            return res.json({status:'error',payload:'Error updating user'})
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


}
export {userController}