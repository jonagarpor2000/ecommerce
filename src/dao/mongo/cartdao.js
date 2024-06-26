import { cartModel } from "./models/carts.models.js";
class cartMg {
    constructor() {
        this.model = cartModel
    }
    getCarts = async () => {
        return await this.model.find({})
    }

    updateCart = async (cid,pid) => {
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

    getCartById = async (cid) => {
            return await this.model.findOne({_id:cid})
    }
    createCart = async () => await this.model.create({products: []})

    addProductToCart = async (cid, pid,quantity) => {
            return await this.model.findByIdAndUpdate({_id:cid},
                {$push:
                    {products:{product: pid,quantity}}
                },{ new: true })
    }

    deleteProductOnCart = async (cid, pid) => {
        let cart = await this.getCartById(cid)
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
    emptyCart = async (cid) => {
            return await this.model.findOneAndUpdate(
              { _id: cid },
              { $set: { products:[]} },
              { new: true }
            );
    }
}

export {cartMg}