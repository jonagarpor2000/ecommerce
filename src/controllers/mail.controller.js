import emailService from "../service/emailService.js";
import { EError } from "../utils/errors/enums.js";
import { CustomError } from "../utils/errors/error.js";
import { generateProductError } from "../utils/errors/info.js";



export class mailController {
    constructor() {
        this.mailservice = new emailService();
      }

        send_order = async (req,res,data) => {

        try {
            const mailOptions = {
                to: data.address,
                subject: `Order ${data.order.id}`,
                html: `
                  <div>
                  <h1>Your order ${data.order.id} has loaded succesfully</h1><br/>
                    <h3>Total: ${data.order.amount}</h3>
                  </div>
                `
              };
              await this.mailservice.sendEmail(mailOptions);
              return res.json({status:'success',payload:'Email enviado'})

        } catch (error) {
            req.logger.error('Error sending mail', error);
            return res.json({status:'error',payload:'Error sending mail'})
        }
    }  
        getById = async (req,res) => {
            const {pid} = req.params
            try {
                let product = await this.service.getById(pid)
                return res.json({status:'success',payload:product})
            } catch (error) {
                req.logger.error(`Product can't be found by id, because: ${error}`)
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
                    req.logger.error(`Product can't be added, because: ${error}`)
                    return res.json( {status:'error',payload:'Error adding product' })
            }
            
            
        }

        deleteprod = async (req,res) => {
            const {id} = req.params
            try {
                const del_prod = await this.service.delete(id)
                if(!del_prod){
                    req.logger.error('product cannot be founded')
                    res.json({status:'error',payload:'Product not found'})
                }
                return res.json({status:'success',payload:del_prod})
            } catch (error) {
                req.logger.error(`Product can't be deleted, because: ${error}`)
                return res.json( {status:'error',payload:'Error deleting product' })
            }
           
        }

        update = async (id,prod)=>{
            try {
                const updatedProduct = this.service.updateProduct(id,prod)
            if (!updatedProduct) {
                return res.json({ status:'error',payload:'Product not found' })
            }
                return res.json({status:'success',payload:updatedProduct}); 
            } catch (err) {
                req.logger.error(`Product can't be updated, because: ${err}`)
                return res.json( {status:'error',payload:'Error updating product' })
            }
        }


        
        
}

