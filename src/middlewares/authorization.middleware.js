import { logger } from "../utils/logger.js";

export const authorization = role => {
    return async (req,res,next) => {
        if(!req.user) return res.status(401).send({status:'error',error:'Unauthorized'})
        logger.info(`authorization required ${role} and you are ${req.user.user.role}`)
        let authorize = String(req.user.user.role).toLowerCase() === String(role).toLowerCase()
        if(!authorize) return res.status(403).send({status:'error',error:'not permissions'})
        
        next()
        
    }
};

