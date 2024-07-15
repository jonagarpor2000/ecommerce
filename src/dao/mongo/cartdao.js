import { cartModel } from "./models/carts.models.js";
export default class cartMgMongo {
    constructor() {
        this.model = cartModel
    }
    getAll = async () => {
        return await this.model.find({})
    }

    update = async (cid,pid) => {
        return await this.model.findOneAndUpdate(
            {_id:cid, 'products.product': pid},
        {$inc:{'products.$.quantity':1}},
        {new:true}
    )
    }
    changeCartQuantity = async (cid,pid) => {
        return await this.model.findOneAndUpdate(
              { _id: cid },
              { $set: { product: {pid}, quantity } },
              { new: true }
            )
    }

    getById = async (cid) => {
            return await this.model.findOne({_id:cid})
    }

    create = async () => await this.model.create({products: []})

    addProductToCart = async (cid, pid,quantity) => {
            return await this.model.findByIdAndUpdate({_id:cid},
                {$push:
                    {products:{product: pid,quantity}}
                },{ new: true })
    }

    deleteProductOnCart = async (cid, pid) => {
        let cart = await this.getById(cid)
        if(!cart){     
            return Error(`The cart doesn't exists`)
        }else{
            console.log(`Carrito: ${cid} y producto: ${pid}`)
            let result = await this.model.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { _id: pid  } } },
                { new: true }
              );
            return result
        }

    }
    empty = async (cid) => {
            return await this.model.findOneAndUpdate(
              { _id: cid },
              { $set: { products:[]} },
              { new: true }
            );
    }


    updateProducts = async (cid,products) => {//pending
        return await this.model.findByIdAndUpdate(
            { _id: cid },
            { $pull: { products: { _id: products } } },
            { new: true }
          );
    }



}
