import cartDto from "../dtos/cart.dto.js"

export default class CartRepository {
    constructor(cartDao){
        this.dao = cartDao
    }

    getAll = async () => await this.dao.getAll()
    createEmpty = async () => await this.dao.create()
    empty = async (cid) => await this.dao.empty(cid)
    getById = async id => await this.dao.getById(id)
    addProduct = async (allcart) =>{ 
        const newproduct = new cartDto(allcart)
        await this.dao.addProduct(newproduct.cid,newproduct.pid,newproduct.quantity)
        
    }

    deleteProductOnCart = async (cid,products) => await this.dao.deleteProductOnCart(cid,products)
    
    
        
}