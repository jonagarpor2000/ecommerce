import cartDto from "../dtos/cart.dto.js"

export default class CartRepository {
    constructor(cartDao){
        this.dao = cartDao
    }

    getAll = async () => await this.dao.getAll()
    getById = async id => await this.dao.getById(id)
    addproduct = async (pid) =>{ 
        const newproduct = new cartDto(pid)
        await this.dao.addproduct(newproduct)
        
    }

    updateProducts = async id => await this.dao.updateProducts(cid,products)
    
    
        
}