import passport from "passport";
import { Strategy } from "passport-jwt";

export const passportCall = strategy => {
    return async (req,res,next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if(err) return next(err)
            if(!user) return res.status(401).send({error: info.message? info.messages : info.toString()})
            req.user = user
            next()
        })(req,res,next)
    }
}