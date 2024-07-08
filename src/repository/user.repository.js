import UserDto from "../dtos/user.dto.js"

export default class UserRepository {
    constructor(userDao){
        this.dao = userDao
    }

    getAll = async () => await this.dao.getAll()
    getBy = async filter => await this.dao.getBy(filter)
    getById = async id => await this.dao.getById(id)
    add = async (user) =>{ 
        const newUser = new UserDto(user)
        await this.dao.create(newUser)
        
    }
    update = async (uid,userToUpdate) => await this.dao.update(uid,userToUpdate)
    delete = async (uid) => await this.dao.delete(uid)
        
}