const node_validator = require('node-input-validator')

var { Validator } = node_validator


module.exports.VALIDATE_GET_CHANNELS = async function( req, res, next ){
    
    let validate = new Validator(req.query, {
        user: "required|numeric",
    },{
        'user.required': "user is required",
    });
     
    var matched = await validate.check()
    if (!matched) {
        req.errors = validate.errors
    }
    next();
}