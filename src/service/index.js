import { UsersManagerMongo } from "../dao/usrDao.js";
import { prodMg } from "../dao/prodDao.js";
import { cartMg } from "../dao/cartdao.js";
export const userService = new UsersManagerMongo()
export const productService = new prodMg()
export const cartService = new cartMg()
