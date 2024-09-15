import { userModel } from './models/users.models.js';
export default class UserMgMongo {
    constructor() {
      this.userModel = userModel;
    }

    async getAll(limit, page) {
        return await this.userModel.paginate({}, {limit, page, lean: true })
    }
  
    async create(newUser) {
        return await this.userModel.create(newUser)
    }
  
    async getBy(filter) {
      return await this.userModel.findOne(filter);
    }
  
    async delete(id_usr) {
      return await this.userModel.deleteOne({_id:id_usr})
    }    
    
    async deleteinactive() {
      return await this.userModel.deleteMany({_id:id_usr})
    }
    
  
  }
