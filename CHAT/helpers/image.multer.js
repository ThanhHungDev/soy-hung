const fs     = require('fs'),
      multer = require('multer')
const CONFIG = require('../config')

const UPLOAD_IMAGES_DIR = './public/uploads/images/'

const imageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        
        callback(null, UPLOAD_IMAGES_DIR ) //hỉnh ảnh sẽ chứa trong folder uploads
    },
    filename: (req, file, callback) => {

        // callback(null , file.originalname)// mặc định sẽ save name của hình ảnh 
        fs.stat(UPLOAD_IMAGES_DIR + file.originalname, (err, stats) => {
            let filename
            if (stats) {
                filename = Date.now() + '.' + file.originalname
            } else {
                filename = file.originalname
            } 
            callback(null, filename)
        })
    }
})

/* defined filter */
const imageFilter = (req, file, callback) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        callback(null, true)
    } else {
        callback(new Error("File format should be image"), false)
    }
}

//save trên local của server khi dùng multer ./public/uploads/images
let uploadImage = multer({ storage: imageStorage, fileFilter: imageFilter }).single("avatar")
let uploadImages = multer({ storage: imageStorage }).array('avatars', 4)

let toResources = image => {
    if(!image){
        return {}
    }
    let [ first, last ] = image.path.split('public/')
    let domain = CONFIG.SERVER.ASSET()
    return {
        name    : image.originalname,
        url     : "/" + last,
        path    : image.path,
        mimetype: image.mimetype,
        size    : image.size,
        domain  : domain
    }
}

module.exports = {
    uploadImage,
    uploadImages,
    toResources
}

/**
 * @swagger
 * components:
 *     schemas:
 *         ImageResources:
 *             type: object
 *             properties:
 *                  name:
 *                     type: string
 *                     description: tên file
 *                     example: bg_girl_login.jpeg
 *                  url: 
 *                      type: string
 *                      description: đường dẫn tới file
 *                      example: /uploads/images/1620975059103.bg_girl_login.jpeg
 *                  path:
 *                      type: string
 *                      description: đường dẫn vật lý tới file 
 *                      example: public/uploads/images/1620975059103.bg_girl_login.jpeg
 *                  mimetype:
 *                      type: string
 *                      description: kiểu file 
 *                      example: image/jpeg
 *                  size: 
 *                      type: int
 *                      description: 
 *                      example: 214853
 *                  domain: 
 *                      type: string
 *                      description: 
 *                      example: http://localhost:8081
 */