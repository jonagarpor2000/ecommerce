import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import session from 'express-session'
import indexRouter from './routers/index.js'
import MongoStore from 'connect-mongo'
import {connectDB, objConfig} from './config/index.js' 
import { initializePassport } from './config/passport.config.js'
import passport from 'passport'
import cookieParser from 'cookie-parser'

const{port,mongoUrl,jwtPrivateKey} = objConfig
const app = express()
app.use(express.static(__dirname+'/public'))
app.use(cookieParser())
app.use(passport.initialize())
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoUrl,
    mongoOptions:{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },        
    ttl:60*60*1000*24
    }),
    secret: jwtPrivateKey,
    resave: true,
    saveUninitialized: true,
    
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.set('views',__dirname+'/views')
app.set('view engine','hbs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(indexRouter)
connectDB()

app.listen(port,'127.0.0.1', error => {
    if(error) console.log(`Error: ${error}`)
    console.log(`Server escuchando en el puerto ${port}`)

})
