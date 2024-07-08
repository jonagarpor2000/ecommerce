import {Router} from 'express'

const router = Router()

router.get('/mail',(req,res)=>{
    try {
        const user = {
            first_name:'Jona',
            last_name:'Jona',
            email:'jonathan.porley15@gmail.com',
        }
        sendEmail({
            email:user.email,
            subject: 'Hola',
            html: `
            <h1>Hola ${user.first_name} ${user.last_name}</h1>
            <p>Este es un email de prueba</p>
            `
        })
        res.send('Email sent')
    } catch (error) {
        console.log(error)
    }
}) 