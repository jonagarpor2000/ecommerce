import { json } from "express";
import { productModel } from "./models/products.models.js";
export default class prodMgMongo {
  constructor() {
      this.model = productModel
  }
    getAll = async (page,sort,limit,query) => {
      return await this.model.paginate(query,{limit,page,'sort':sort,lean:true})
    };

  getById = async(id) => {
    return await this.model.findById(id);
  }
  
   add = async(product) =>{
    return await this.model.create(product)
  }

  delete = async (id)=>{
    return await this.model.findByIdAndDelete(id)
  }

  update = async (id,prod)=>{
    const {title,description,price,status,category,thumbnail,code,stock} = prod
    return await this.model.findOneAndUpdate(
        { _id: id },
        { $set: { title, description, price, status, category, thumbnail, code, stock } },
        { new: true }
      );
  }

}
