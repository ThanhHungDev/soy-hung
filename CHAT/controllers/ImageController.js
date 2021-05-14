const imageMulterHelper = require("../helpers/image.multer")
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


module.exports = {
    uploadAvatar,
    uploadMultipleImages,
}