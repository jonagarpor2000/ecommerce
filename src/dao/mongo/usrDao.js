import { userModel } from './models/users.models.js';
export default class UserMgMongo {
    constructor() {
      this.userModel = userModel;
    }

    async getAll({limit = 10, numPage=1}) {
        return await this.userModel.paginate({}, {limit, page: numPage, sort: {price: -1}, lean: true })
    }
  
    async create(newUser) {
        return await this.userModel.create(newUser)
    }
  
    async getBy(filter) {
      let usr = await this.userModel.findOne(filter)
      console.log(`tengo ${filter} con ${usr}`)
      return usr ;
    }
  
    async delete(id_usr) {
      return await this.userModel.deleteOne({_id:id_usr})
    }
    
  
  }
