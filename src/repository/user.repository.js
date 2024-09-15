import UserDto, { AllUserDto } from "../dtos/user.dto.js"
import { logger } from "../utils/logger.js"
import { plainToClass } from 'class-transformer';

export default class UserRepository {
    constructor(userDao){
        this.dao = userDao
    }

    getAll = async (limit,page) => {
        let allUsers = await this.dao.getAll(limit,page)
        logger.info(`Getting all users from DAO ${allUsers.docs}`)
        //allUsers = new UserDto(allUsers.docs)
        return allUsers
    }
    getBy = async filter => await this.dao.getBy(filter)
    getById = async id => await this.dao.getById(id)
    create = async (user) =>{ 
        const newUser = new AllUserDto(user)
        logger.info(`User DTO: ${newUser._id}`)
        let result = await this.dao.create(newUser)
        result = new UserDto(result)
        return result
    }
    update = async (uid,userToUpdate) => await this.dao.update(uid,userToUpdate)
    delete = async (uid) => await this.dao.delete(uid)
    updateLastAccess = async (email) => await this.dao.updateLastAccess(email)
    deleteinactive = async () => await this.dao.deleteinactive()

        
}