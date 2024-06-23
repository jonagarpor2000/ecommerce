import jwt from 'jsonwebtoken'
import { objConfig } from '../config/index.js'


export const PRIVATE_KEY = objConfig.jwtPrivateKey
export const generateToken = user => jwt.sign({user},PRIVATE_KEY, {expiresIn:'24h'})
