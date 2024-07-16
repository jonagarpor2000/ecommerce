import winston, { debug } from 'winston'
const customLevelOptions = {
    levels: {
        fatal:0,
        error:1,
        warning:2,
        info:3,
        debug:4,
    },
    colors: {
      fatal:'red',
      error:'red',
      warning:'yellow',
      info:'blue',
      debug:'white',
    }
}


export const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports:[
        new winston.transports.Console({//Entorno de desarrollo
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({colors:customLevelOptions}),
                winston.format.simple() 
            ),
        }),
        new winston.transports.File({//Produccion
            filename: './errors.log',
            level: 'warn',
            format: winston.format.simple()
        })
    ]
})



export const addLogger = (req,res,next) => {
    req.log = logger
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
    next()
}