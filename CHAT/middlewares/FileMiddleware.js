const multer = require('multer')

const fileMulterHelper = require("../helpers/file.multer"),
      errorHelper      = require('../helpers/error.helper')

let uploadFile = ( req, res, next ) => {

    fileMulterHelper.uploadFile(req, res, function (err) {
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
    uploadFile
}