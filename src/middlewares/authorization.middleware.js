export const authorization = role => {
    return async (req,res,next) => {
        /*for (const [key, value] of Object.entries(req.user.user)) {
            console.log(`${key}: ${value}`);
          }*/
        if(!req.user) return res.status(401).send({status:'error',error:'Unauthorized'})
        if(req.user.user.role.toLowerCase() ===! role.toLowerCase()) return res.status(403).send({status:'error',error:'not permissions'})
        
        next()
        
    }
};

