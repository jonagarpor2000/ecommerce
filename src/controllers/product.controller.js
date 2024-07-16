import { productService } from "../service/index.js";
import { EError } from "../utils/errors/enums.js";
import { CustomError } from "../utils/errors/error.js";
import { generateProductError } from "../utils/errors/info.js";


export class productController {
    constructor() {
        this.service = productService
    }
        getAll = async (req,res) => {
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
            let products = await this.service.getAll(page,sortsentence,limit,query)  
            products.prevLink = `/products?page=${products.prevPage}&limit=${products.limit}`
            products.nextLink = `/products?page=${products.nextPage}&limit=${products.limit}`      
            return res.json({status:'success',payload:products})
        } catch (error) {
            return res.json({status:'error',payload:error})
        }
    }  
        getById = async (req,res) => {
            const {pid} = req.params
            try {
                let product = await this.service.getById(pid)
                return res.json({status:'success',payload:product})
            } catch (error) {
                return res.json({status:'error',payload:error})
            }

        }
  
        add = async (req,res) => {
            try {
                const {title,description,price,status,thumbnail,code,stock} = req.body
                if(!title || !price){
                    CustomError.createError({
                        name:'Error al crear producto',
                        cause: generateProductError({title,description,price,status,thumbnail,code,stock}),
                        message:'Error al crear producto por campos invalidos o faltantes',
                        code: EError.INVALID_TYPES_ERROR,
                        
                     })   
                }
                let product = {title,description,price,status,thumbnail,code,stock}
                        let addedprod = await this.service.add(product)
                        return res.json({status:'success',payload:addedprod})
                }catch (error) {
                console.log(error)
            }
            
            
        }

        deleteprod = async (req,res) => {
            const {id} = req.params
            const del_prod = await this.service.delete(id)
            if(!del_prod){
                res.json({status:'error',payload:'Product not found'})
            }
            return res.json({status:'success',payload:del_prod})
        }

        update = async (id,prod)=>{
            try {
                const updatedProduct = this.service.updateProduct(id,prod)
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

