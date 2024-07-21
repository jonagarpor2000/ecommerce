import winston from 'winston'
import { objConfig } from '../config/index.js'


const customLevelOptions = {
    levels: {
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5,
    },
    colors: {
      fatal:'red',
      error:'red',
      warning:'yellow',
      info:'blue',
      http:'cyanBG',
      debug:'white',
    }
}

let logtransport = objConfig.mode === "production" ? [
    new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize({colors:customLevelOptions.colors}),
            winston.format.simple() 
        ),
    }),
    new winston.transports.File({
        filename: './errors.log',
        level: 'error',
        format: winston.format.simple()
    })
] 

: objConfig.mode === "development" ? [
    new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize({colors:customLevelOptions.colors}),
            winston.format.simple() 
        ),
    }),
    new winston.transports.File({
        filename: './errors.log',
        level: 'error',
        format: winston.format.simple()
    })
]: null;


export const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: logtransport
})



export const addLogger = (req,res,next) => {
    req.logger = logger
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
    next()
}