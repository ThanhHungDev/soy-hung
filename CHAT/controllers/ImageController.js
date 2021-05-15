const path  = require('path'),
      fs    = require('fs'),
      sharp = require('sharp')

const imageMulterHelper = require("../helpers/image.multer"),
      CONFIG            = require('../config'),
      TYPE__FILL        = "fill"
/**
 * @swagger
 *  /api/v1/avatar:
 *      post:
 *          summary: upload avatar cho user
 *          description: upload avatar dựa trên access token 
 *          tags: [ user ]
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              - in: query
 *                name: token
 *                schema:
 *                  type: string
 *                  example: sdfsfds31231321312efsf
 *                required: true
 *                description: access token xác thực ngừoi dùng giao
 *              - name: file
 *                in: formData   # <-----
 *                description: The uploaded file data
 *                required: true
 *                type: file     # <-----
 *          responses:
 *              200:
 *                  description: A single user.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                 code:
 *                                      type: integer
 *                                      description: chỉ định mã lỗi để FE handle
 *                                      example: 200
 *                                 data: 
 *                                     $ref: '#/components/schemas/ImageResources'
 *                      
 *                  
*/
let uploadAvatar = async (req, res) => {

    const { file } = req
    let response = {}
    /// response 
    response.code = 204
    if( file ){
        response.code = 200
    }
    response.data    = imageMulterHelper.toResources(file)
    response.message = response.internal_message = "thành công"
    return res.status(response.code).json(response)
}

let uploadMultipleImages = async (req, res) => {

    const { files } = req
    let   response = {}
    /// response 
    response.code = 204
    if( file ){
        response.code = 200
    }
    response.data    = files
    response.message = response.internal_message = "thành công"
    return res.status(response.code).json(response)
}

let resize = async (req, res) => {

    const { size, type, imagePath } = req.params
    
    const imageFullPath = path.join(__dirname, '../public/' + imagePath)
    const sizes = CONFIG.SIZES
    
    /// nếu file không tồn tại thì trả về 404
    try {
        /// file tồn tại trong hệ thống
        const savedPath = path.join(__dirname, '../public/resizes/' + size + '/' + type + '/' + imagePath )
        const savedDir  = path.dirname(savedPath) // .split(path.sep).pop()
        
        if( !fs.existsSync(imageFullPath) || typeof sizes[size] != 'object' ) {
            
            return res.status(404).json({ imageFullPath, savedDir })
        }
        
        // nếu diẻctory không tồn tại thì tạo ra
        if (!fs.existsSync(savedDir)) {
            
            fs.mkdirSync(savedDir, { recursive: true })
        }
        const [ width, height ] = sizes[size]
        let optionsResizes = {
            fit: sharp.fit.cover
        }
        if( type == TYPE__FILL ){
            optionsResizes = { 
                fit: sharp.fit.contain,
                background: { r: 255, g: 255, b: 255 }
            }
        }
        // let data = 
        await sharp(imageFullPath).resize(width,height, optionsResizes).toFile(savedPath)

        let img = fs.readFileSync(savedPath)
        res.writeHead(200, {'Content-Type': 'image/gif' })
        res.end(img, 'binary')
    } catch (err) {
        return res.status(404).json({ imagePath: err.message })
    }
}

module.exports = {
    uploadAvatar,
    uploadMultipleImages,
    resize,
}