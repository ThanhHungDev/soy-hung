const node_validator = require('node-input-validator')

var { Validator } = node_validator


module.exports.VALIDATE_GET_CHANNEL_MESSAGE = async function( req, res, next ){
    
    let validate = new Validator(req.body, {
        access : "required",
    },{
        'userId.required': "userId is required",
        'access.required': "Access is valid",
    });
     
    var matched = await validate.check()
    if (!matched) {
        req.error = validate.errors
    }
    next();
}