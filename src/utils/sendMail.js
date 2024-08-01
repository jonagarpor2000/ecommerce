import nodemailer from 'nodemailer'
import {objConfig} from '../config/index.js' 

let {gmail_pass,gmail_usr} = objConfig
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmail_usr,
        pass: gmail_pass
    }
})

export const sendEmail = async ({mail},{order}) => {
    return await transport.sendMail({
        from: `Services Manager<${gmail_usr}>`,
        to: mail,
        subject: `Order ${order.id}`,
        text: 'You bought some products from our ecommerce.<br>There is your bill</br>',
        html: `<div>
        <h1>Total amount: ${order.amount}</h1>
        </div>`,
        attachments:[{
            filename: 'logo.png',
            path: `${__dirname}/../../public/e-facture.pdf`,
            cid: 'billing order'
        }]
    })
}