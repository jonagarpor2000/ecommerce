import multer from 'multer'
import path from 'path'
import __dirname from '../utils.js'
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, path.join(__dirname,'/public/uploads'))
    },
    filename: function(req, file, callback){
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({
    storage
})

export {uploader}