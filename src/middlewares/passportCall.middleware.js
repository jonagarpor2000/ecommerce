import passport from "passport";
import { generateToken } from "../utils/jwt.js";
import { logger } from "../utils/logger.js";

export const passportCall = strategy => {
    return async (req,res,next) => {
        passport.authenticate(strategy, function (err, user, info) {
            logger.info(`passportcalled user ${user} with ${strategy}`)
            if(err) return next(err)
            if(!user) return res.status(401).send({error: info.message? info.messages : info.toString()})
            req.user = user
            next()
        })(req,res,next)
    }
}