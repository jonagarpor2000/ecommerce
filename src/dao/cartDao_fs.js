import { promises as fs } from "fs"
import { pid } from "process";


/***
 * @typedef {Object} Cart
 * @property {number} cid identificador del carrito
 * @property {string} products Array con ids del producto
 * @property {string} quantity (Cantidad del producto)
 */

/**
 *  @constant
 *  @default
 */

export default class CartManager{

 /**
     * @type {Array<Product>}
     */
#carts;
/**
 * @type {string} String que contiene error en caso de de que el retorno o cargado de productos falle.
 */
#error;
/**
 * @type {string} Ubicacion del archivo
 */
path;

 constructor(path){
     this.#carts = [];
     this.#error=undefined;
     this.path = path
 }
    getCarts = async() =>{
        return await this.#readfilecontent(this.path)
    }

    getCartById = async(id) =>{
        try{
            this.#carts = await this.getCarts()
            return cart.find(c => c.id === id)
        }catch (error){
            this.#error = 'An error occurred when it tried to load the file'
            return this.#error
        }
    }

    createCart = async() =>{
        try {
            this.#carts = await this.getCarts()
                const cart = {
                    id: this.#getNextId(),
                    products: []
                }
                this.#carts.push(cart)
                let res = await this.#writefilecontent()
                return res
        } catch(error){
            console.log(error)
        }
        
    }

    addProductToCart = async(cid,pid) =>{
        try {
            this.#carts = await this.getCarts()
            const cartindex = this.#carts.findIndex((cart) => cart.id === cid);
            if(cartindex === -1){
                return 'El carrito no existe'
            }else{
                const existeProducto = this.#carts[cartindex].products.findIndex(
             (cartProduct) => cartProduct.pid === pid
              )
            if(existeProducto!== -1){
                this.#carts[cartindex].products[existeProducto].quantity += 1
            }else{
                this.#carts[cartindex].products.push({pid:pid,quantity:1})
            } 
            await this.#writefilecontent()
            return `Producto agregado con exito`
            }
        } catch(error){
            console.log(error)
        }
        
    }

    #getNextId(){
        let ultimaposicion = 1;
        if(this.#carts.length === 0){
            return ultimaposicion;
        }
        ultimaposicion = this.#carts.at(-1).id + 1; //Esto es por si me eliminan valores del medio
        return ultimaposicion;
    }

    

    #readfilecontent = async (path) => {
        try{
            const contenido = await fs.readFile(path,'utf-8')
            return JSON.parse(contenido)
        }catch (error){

            return []
        }
    }

    #writefilecontent = async () => {
        try{
            fs.writeFile(this.path, JSON.stringify(this.#carts,null,'\t'),'utf-8' );
            return 'Producto aniadido al carrito'
        }catch (error){

            this.#error = 'Ocurrio un error al escribir el archivo'
            return this.#error
        }
    }

    #validateCartEntries = (id,pid) => {
        if (!id || !pid) {
            this.#error = `[${code}]: campos incompletos`
        } else {
            const found = this.#carts.find(producto => producto.code === code)
            if (found) this.#error = `[${code}]: el identificador del producto ya existe`
            else this.#error = undefined
        }
    }

    deleteCart = async (id)=>{
        let content = await this.getCarts()
        let cont_nodelete = content.filter(producto => producto.id != id)
        await fs.writeFile(this.path, JSON.stringify(cont_nodelete, null,'\t'),'utf-8')
    }

    updateCart = async (id,title, description, price, thumbnail,code,stock)=>{
        let contenido = await this.getProducts()
        let map_cont = contenido.map(producto => producto.id)
        let indx = map_cont.indexOf(id)
        if(indx===-1){
            console.log('No existe tal producto');
        }else{
            let prod = {
                'id': id,
                'title': title,
                'description': description,
                'price': price,
                'thumbnail': thumbnail,
                'code': code,
                'stock': stock
            }
            contenido.splice(indx,1,prod)
            await fs.writeFile(this.path, JSON.stringify(contenido, null,'\t'))
        }
        
        

    };
}



