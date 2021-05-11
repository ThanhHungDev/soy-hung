const node_validator = require('node-input-validator')

var { Validator } = node_validator


module.exports.VALIDATE_CREATE_REFRESH = async function( req, res, next ){
    
    let validate = new Validator(req.body, {
        userId  : "required",
        refresh : "required",
        socketId: "required",
    },{
        'userId.required'  : "userId is required",
        'refresh.required' : "Refresh is valid",
        'socketId.required': "socket id is required",
    });
     
    var matched = await validate.check()
    if (!matched) {
        req.error = validate.errors
    }
    next();
}