
import { userService } from "../service/index.js"

class userController {
    constructor() {
        this.userService = userService
    }
     getUsers = async(req, res) => {
        const usersFounded = await this.userService.getUsers()
        res.json({status:'success', payload: usersFounded})
        
    }
     getUser = async (req, res) => {
        const {uid} = req.params
        const userFound = await this.userService.getUserBy({_id:uid})
        res.json({status:'success', payload: userFound})
        
    }

    createUser = async (req,res) => {
        const {first_name,last_name,email,age,cart,role,password,} = req.body
        const newUser = {first_name,last_name,email,age,cart,role,password,}
        const userCreated = await this.userService.createUser(newUser)
        res.send({status:'success', payload: userCreated})
    }
    
    updateUser = async (req,res) => { //Pending
        const {first_name,last_name,email,age,cart,role,password,} = req.body
        const newUser = {first_name,last_name,email,age,cart,role,password,}
        const userCreated = await this.userService.createUser(newUser)
        res.send({status:'success', payload: userCreated})
    }
    
    deleteUser = async (req,res) => {
        const {uid} = req.body
        
        const userDeleted = await this.userService.deleteUser(uid)
        res.send({status:'success', payload: userDeleted})
    }


}
export {userController}