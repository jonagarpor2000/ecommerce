import { Router, json } from 'express'
import productsRouter from './api/products.router.js'
import cartsRouter from './api/carts.router.js'
import usersRouter from './api/users.router.js'
import ticketsRouter from './api/tickets.router.js'
//import {fork} from 'child_process'
import { sessionsRouter } from './api/sessions.router.js'
import {faker} from '@faker-js/faker'
import crypto from 'crypto'

const router = Router()

router.use('/products',productsRouter)
router.use('/carts',cartsRouter)
router.use('/',ticketsRouter)
router.use('/users',usersRouter)
router.use('/sessions',sessionsRouter)
router.get('/mockingproducts',async (req,res) => {
    //const child = fork('./src/utils/generateProductsMock.js')
    let quantity = 10
    let prods = []
    for (let i = 0; i < 10; i++) {
        prods.push(products())
    }

    res.status(200).send({ status:"success", message: prods })

    /*child.send(quantity)
    child.on('message', result =>{
        fakeproducts = result
    })
    
    child.on('error', (error) => {
        console.error('Error in child process:', error);
        res.status(500).send({ message: 'Error generating mock products' }); // Handle child process error
    });*/
    
    
})

function products () {
    return{
        id: crypto.randomUUID(),
        title: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        status: faker.boolean,
        category: faker.commerce.department(),
        thumbnail: faker.image.url(),
        code: faker.string.numeric(10),
        stock: parseInt((faker.string.numeric(1,{bannedDigits:['0']})))
    }
}


export default router