import { userModel } from './models/users.models.js';
export class UsersManagerMongo {
    constructor() {
      this.userModel = userModel;
    }

    async getUsers({limit = 10, numPage=1}) {
        return await this.userModel.paginate({}, {limit, page: numPage, sort: {price: -1}, lean: true })
    }
  
    async createUser(newUser) {
        return await this.userModel.create(newUser)
    }
  
    async getUserBy(filter) {
      let usr = await this.userModel.findOne(filter)
      console.log(`tengo ${filter} con ${usr}`)
      return usr ;
    }
  
    async getUserByEmail(email) {
      return await this.getUserBy({email})
    }

    async deleteUser(id_usr) {
      return await this.userModel.deleteOne({_id:id_usr})
    }
    
  
  }
