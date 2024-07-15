import {faker} from '@faker-js/faker'
import crypto from 'crypto'
import proccess from 'process'


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

proccess.on('message',quantity =>{
    console.log(`Tengo recibido: ${quantity}`)
    let prods = []
    console.log(`Generando ${quantity} productos`)
    for (let i = 0; i < 10; i++) {
        prods.push(products())
    }
    process.send(prods)  
})