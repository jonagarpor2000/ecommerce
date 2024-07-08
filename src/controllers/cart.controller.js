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
            return res.json({status:'error',payload:error})
        }
    }
    buy = async (req,res) => {//Pending
        try {
            let carts = await this.cartService.buy()
            return res.json({status:'success',payload:carts})
        } catch (error) {
            return res.json({status:'error',payload:error})
        }
    }
    getByid = async (req,res) => {
        const {cid} = req.params
        try {
            let cart = await this.cartService.getCartById(cid)
            return res.json({status:'success',payload:cart})
        } catch (error) {
            return res.json({status:'error',payload:error})
        }
    }
    addProduct = async (req,res) => {
        const {body} = req
        const {cid,pid,quantity} = body
        try {
            let cart = await cartService.getCartById(cid)
            if(!cart?.products||!cid){
                
                cid = (await cartService.createCart()._id)
            }
            let result = await this.cartService.addProductToCart(cid,pid,quantity)
            return res.json({status:'success',payload:result})
        } catch (error) {
            return res.json({status:'error',payload:error})
        }
    }
    update = async (req,res) => {
        try {
            let result = await this.cartService.updateCart(cid,pid)
            return res.json({status:'success',payload:result})
        } catch (error) {
            return res.json({status:'error',payload:error})
        }
    }
    deleteProduct = async (req,res) => {
        const {cid,pid} = req.params
        
        try {
            let cart = await cartService.getCartById(cid)
            if(!cart){
               return res.json({status:'error',payload:`The cart doesn't exists`})
            }
            let result = await this.cartService.deleteProductOnCart(cid,pid)
            return res.json({status:'success',payload:result})
        } catch (error) {
            return res.json({status:'error',payload:error})
        }
    }
    emptyCart = async (req,res) => {
        const {cid} = req.params
        try {
            let cart = await cartService.getCartById(cid)
            if(!cart){
                return res.json({status:'error',payload:`The cart doesn't exists`})
             }

            let result = await this.cartService.emptyCart(cid)
            res.json({status:'success',payload:result})
        } catch (error) {
            res.json({status:'error',payload:error})
        }
    }
    changeCartQuantity = async (req,res) => {// pending
        const {cid,pid} = req.params
        try {
            let cart = await cartService.getCartById(cid)
            if(!cart){
               return res.json({status:'error',payload:`The cart doesn't exists`})
            }
            let result = await this.cartService.changeCartQuantity(cid,pid)
            return res.json({status:'success',payload:result})
        } catch (error) {
            res.json({status:'error',payload:error})
        }
    }
}