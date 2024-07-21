import {connect} from 'mongoose'
import dotenv from 'dotenv'
import {Command} from 'commander'

const program = new Command()

program   
.option('-d', 'variable para debug',false)
.option('-p <port>', 'puerto del server',8080)
.option('--mode <mode>', 'modo de trabajo de mi server','production')
.option('-u <user>','usuario utilizando el aplicativo', 'no se ha declarado user')
.parse()

const {mode} = program.opts()
dotenv.config({
    path: mode === 'production'? './.env.production' : './.env.development'
})

export const objConfig = {
    port: process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    persistence:process.env.PERSISTENCE,
    mode: mode
}
    
export const connectDB = () => {
        connect(objConfig.mongoUrl)
        console.log('Connected to DB')
    }