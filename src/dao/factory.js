import { objConfig } from "../config/index.js"

export let ProductDao
export let CartDao
export let UserDao
export let OrderDao

switch(objConfig.persistence){
    case 'MONGO':
        const {default: prodMgMongo} = await import("./mongo/prodDao.js")
        const {default: cartMgMongo} = await import("./mongo/cartdao.js")
        const {default: UserMgMongo} = await import("./mongo/usrDao.js")
        ProductDao = prodMgMongo
        CartDao = cartMgMongo
        UserDao = UserMgMongo
        break
    case 'FS':
        const {default: ProductDaoFS} = await import("./fs/prodDao_fs.js")
        const {default: CartDaoFS} = await import("./fs/cartDao_fs.js")
        //const {default: UserDaoFS} = await import("./fs/")
        ProductDao = ProductDaoFS
        CartDao = CartDaoFS
        //UserDao = UserDaoFS
        break
    default:
        
        break
}