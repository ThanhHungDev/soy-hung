const multer = require('multer')

const imageMulterHelper = require("../helpers/image.multer"),
      errorHelper       = require('../helpers/error.helper')


let uploadImage = ( req, res, next ) => {
    

    imageMulterHelper.uploadImage(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            req.errors = { file : { message: err.message, rule: "multer"} }
            return errorHelper.apiResponseErrorResource( req, res )
        } else if (err) {
            // An unknown error occurred when uploading.
            req.errors = { file : { message: err.message, rule: "server"} }
            return errorHelper.apiResponseErrorResource( req, res )
        }
        next()
    })
}
let uploadImages = ( req, res, next ) => {
    

    imageMulterHelper.uploadImages(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            req.errors = { file : { message: err.message, rule: "multer"} }
            return errorHelper.apiResponseErrorResource( req, res )
        } else if (err) {
            // An unknown error occurred when uploading.
            req.errors = { file : { message: err.message, rule: "server"} }
            return errorHelper.apiResponseErrorResource( req, res )
        }
        next()
    })
}

module.exports = {
    uploadImage,
    uploadImages,
}