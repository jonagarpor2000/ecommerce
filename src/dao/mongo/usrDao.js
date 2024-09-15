import { now } from 'mongoose';
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
    async updateLastAccess(email) {
       let result = await this.userModel.findOneAndUpdate({email},{$set:{'lastAccess':now()}},{ new: true, upsert: true, multi: true })
       return result
    }

      //2*24*60*60*1000
      async getAllInactive() {
        return await this.model.find({ 'lastAccess': {
          $gte: now()-30*1000, //.toISOString(),
              }
        },
        {
           allowDiskUse: false
        })
      }


  }
