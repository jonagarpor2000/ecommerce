import { cartService } from "../service/index.js";

export class cartController {
    constructor(){
        this.cartService = cartService
    }

    getAll = async (req,res) => {
        try {
            let carts = await this.cartService.getAll()
            return res.json({status:'success',payload:carts})
        } catch (error) {
            req.logger.error(`Error getting carts, because: ${error}`)
            return res.json( {status:'error',payload:'Error finding carts' })
        }
    }
    
    getByid = async (req,res) => {
        const {cid} = req.params
        try {
            let cart = await this.cartService.getById(cid)
            return res.json({status:'success',payload:cart})
        } catch (error) {
            req.logger.error(`Error getting cart, because: ${error}`)
            return res.json( {status:'error',payload:'Error finding cart' })
        }
    }
    addProduct = async (req,res) => {
        const {body} = req
        const {cid,pid,quantity} = body
        try {
            let cart = await cartService.getById(cid)
            if(!cart?.products||!cid){
                
                cid = (await cartService.createCart()._id)
            }
            let result = await this.cartService.addProduct({cid,pid,quantity})
            return res.json({status:'success',payload:result})
        } catch (error) {
            req.logger.error(`Error adding cart, because: ${error}`)
            return res.json( {status:'error',payload:'Error adding cart' })
        }
    }
    update = async (req,res) => {
        const {cid,pid} = req.params
        try {
            let result = await this.cartService.updateCart(cid,pid)
            return res.json({status:'success',payload:result})
        } catch (error) {
            req.logger.error(`Cart cannot be updated, because: ${error}`)
            return res.json( {status:'error',payload:'Error updating cart' })
        }
    }
    deleteProduct = async (req,res) => {
        const {cid,pid} = req.params
        try {
            let cart = await cartService.getById(cid)
            if(!cart){
               return res.json({status:'error',payload:`The cart doesn't exists`})
            }
            let result = await this.cartService.deleteProductOnCart(cid,pid)
            return res.json({status:'success',payload:result})
        } catch (error) {
            req.logger.error(`Cart cannot be deleted, because: ${error}`)
            return res.json( {status:'error',payload:'Error deleting cart' })
        }
    }
    emptyCart = async (req,res) => {
        const {cid} = req.params
        try {
            let cart = await cartService.getById(cid)
            if(!cart){
                return res.json({status:'error',payload:`The cart doesn't exists`})
             }

            let result = await this.cartService.emptyCart(cid)
            res.json({status:'success',payload:result})
        } catch (error) {
            req.logger.error(`Cart cannot be empty, because: ${error}`)
            return res.json( {status:'error',payload:'Error empty out the cart' })
        }
    }
    changeCartQuantity = async (req,res) => {// pending
        const {cid,pid} = req.params
        try {
            let cart = await cartService.getById(cid)
            if(!cart){
               return res.json({status:'error',payload:`The cart doesn't exists`})
            }
            let result = await this.cartService.changeCartQuantity(cid,pid)
            return res.json({status:'success',payload:result})
        } catch (error) {
            req.logger.error(`Cart cannot be updated, because: ${error}`)
            return res.json( {status:'error',payload:'Error updating quantity of cart' })
        }
    }
}