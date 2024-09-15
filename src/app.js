import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import indexRouter from './routers/index.js'
import {connectDB, objConfig} from './config/index.js' 
import { initializePassport } from './config/passport.config.js'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { addLogger, logger } from './utils/logger.js';
import swaggerJsDocs  from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

const{port,mongoUrl,jwtPrivateKey} = objConfig
const app = express()

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion de app ecommerce',
            version: '1.0.0',
            description: 'Ecommerce solicitado en coderhouse'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

app.use('/virtual',express.static(__dirname+'/public'))
app.use(cookieParser())
app.use(addLogger)
app.use(passport.initialize())
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))




initializePassport()
app.use(passport.initialize())

app.set('views',__dirname+'/views')
app.set('view engine','hbs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const specs = swaggerJsDocs(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use(indexRouter)
connectDB()

app.listen(port,'127.0.0.1', error => {
    if(error) logger.info(`Error: ${error}`)
    logger.info(`Server escuchando en el puerto ${port}`)

})
