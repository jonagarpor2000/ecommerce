export default class productDto{
    constructor(product){
        this.id = product.id
        this.title = product.title
        this.description = product.description
        this.price = product.price
        this.status = product.status
        this.category = product.category
        this.thumbnail = product.thumbnail
        this.code = product.code
        this.stock = product.stock
    }
}