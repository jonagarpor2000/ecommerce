import { json } from "express";
import { productModel } from "./models/products.models.js";
class prodMg {
  constructor() {
      this.model = productModel
  }
    getProducts = async (page,sort,limit,query) => {
      return await this.model.paginate(query,{limit,page,'sort':sort,lean:true})
    };

  getProductById = async(id) => {
    const products = await this.model.findById(id)
    return products;
  }
  
  addProduct = async(product) =>{
    return await this.model.create(product)
  }

  deleteProduct = async (id)=>{
    return await this.model.findByIdAndDelete(id)
  }

  updateProduct = async (id,prod)=>{
    const {title,description,price,status,category,thumbnail,code,stock} = prod
    return await this.model.findOneAndUpdate(
        { _id: id },
        { $set: { title, description, price, status, category, thumbnail, code, stock } },
        { new: true }
      );
  }

}

export {prodMg}