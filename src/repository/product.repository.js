import ProductDto from "../dtos/product.dto.js"

export default class productRepository {
    constructor(productDao){
        this.dao = productDao
    }

    getAll = async () => await this.dao.getAll()
    getById = async id => await this.dao.getById(id)
    getStock = async pid => await this.dao.getStock(pid)
    add = async (product) =>{ 
        const newProduct = new ProductDto(product)
        return await this.dao.add(newProduct)
        
    }
    update = async (uid,userToUpdate) => await this.dao.update(uid,userToUpdate)
    updateStock = async (pid,newStock) => await this.dao.updateStock(pid,newStock)
    delete = async (uid) => await this.dao.delete(uid)
        
}