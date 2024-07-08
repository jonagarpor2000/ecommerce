
import { CartDao, ProductDao, UserDao } from "../dao/factory.js";
import CartRepository from "../repository/cart.repository.js";
import productRepository from "../repository/product.repository.js";
import UserRepository from "../repository/user.repository.js";


export const productService = new productRepository(new ProductDao)
export const cartService = new CartRepository(new CartDao)
export const userService = new UserRepository(new UserDao)
