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
import { addLogger } from './utils/logger.js';
import swaggerJsDocs  from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

const{port,mongoUrl,jwtPrivateKey} = objConfig
const app = express()

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion de app ecomerce',
            version: '1.0.0',
            description: 'Ecommerce solicitado en coderhouse'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

app.use(express.static(__dirname+'/public'))
app.use(cookieParser())
app.use(addLogger)
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

const specs = swaggerJsDocs(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use(indexRouter)
connectDB()

app.listen(port,'127.0.0.1', error => {
    if(error) console.log(`Error: ${error}`)
    console.log(`Server escuchando en el puerto ${port}`)

})
