import nodemailer from 'nodemailer'
import {objConfig} from '../config/index.js' 
import { log } from '../utils/logger.js'

let {mail_pass,mail_usr} = objConfig
const transport = nodemailer.createTransport({
    service: 'zoho',
    auth: {
        user: mail_usr,
        pass: mail_pass
    }
})

export default class emailService {

    sendEmail = async (mailOptions) =>{ 
        mailOptions.from = `Ecommerce managment <${mail_usr}>`
        log.info(`
            Mail sent  from: ${mailOptions.from})
            Mail sent to: ${mailOptions.to}
            Subject: ${mailOptions.subject}
            HTML: ${mailOptions.html}
            Attachments: ${mailOptions.attachments}`)
        await transport.sendMail(mailOptions)
    }
}
