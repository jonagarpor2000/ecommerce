import { productService } from "../service/index.js";


export class productController {
    constructor() {
        this.prodService = productService
    }
        getProducts = async (req,res) => {
        let {page,limit,query,sort} = req.query
        page = page != undefined ? page : 1;
        limit = limit != undefined ? limit : 10;
        query = query != undefined ? {category:query} : {};
        sort = sort === "asc" ? 1 : sort === "desc" ? -1 : 0;
        let sortsentence 
        if (sort===0){
            sortsentence = {}
        }else{
            sortsentence = {price: sort}
        }
        try {
            let products = await this.prodService.getProducts(page,sortsentence,limit,query)  
            products.prevLink = `/products?numPage=${products.prevPage}&limit=${products.limit}`
            products.nextLink = `/products?numPage=${products.nextPage}&limit=${products.limit}`      
            return res.json({status:'success',payload:products})
        } catch (error) {
            return res.json({status:'error',payload:error})
        }
    }  
        getProductById = async(id) => {
            return await this.prodService.getProductById(id)
        }
  
        addProduct = async(product) =>{
            const {title,description,price,status,thumbnail,code,stock} = product
            if(!title || !description || !price || !status || !thumbnail || !code || !stock){
                return res.json({status:'error',payload:'Error: campos incompletos'})
            }else{
                try {
                    let addedprod = await this.prodService.addProduct(product)
                    return res.json({status:'success',payload:addedprod})
                    
                } catch (error) {
                    return res.json({status:'error',payload:error})
                }
            }
            
            
        }

        deleteProduct = async (id)=>{
            const del_prod = await this.prodService.deleteProduct(id)
            if(!del_prod){
                res.json({status:'error',payload:'Product not found'})
            }
            return res.json({status:'success',payload:del_prod})
        }

        updateProduct = async (id,prod)=>{
            try {
                const updatedProduct = this.prodService.updateProduct(id,prod)
            if (!updatedProduct) {
                return res.json({ status:'error',payload:'Product not found' })
            }
                return res.json({status:'success',payload:updatedProduct}); 
            } catch (err) {
                console.error(err);
                return res.json( {status:'error',payload:'Error updating product' })
            }
        }
        
        
}

