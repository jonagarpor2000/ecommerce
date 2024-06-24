import { UsersManagerMongo } from "../dao/mongo/usrDao.js";
import { prodMg } from "../dao/mongo/prodDao.js";
import { cartMg } from "../dao/mongo/cartdao.js";
export const userService = new UsersManagerMongo()
export const productService = new prodMg()
export const cartService = new cartMg()
