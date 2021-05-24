const node_validator = require('node-input-validator'),
      mongoose       = require('mongoose'),
      errorHelper    = require('../helpers/error.helper'),
      { Validator }  = node_validator


// define rule
node_validator.extend('unique', async ({ value, args }) => {
    // default field is email in this example
    const field = args[1] || 'email'
  
    let condition = {}

    condition[field] = value
  
    // add ignore condition
    // if (args[2]) {
    //   condition['_id'] = { $ne: mongoose.Types.ObjectId(args[2]) };
    // }
  
    let emailExist = await mongoose.model(args[0]).findOne(condition).select(field);
  
    // email already exists
    if (emailExist) {
      return false
    }
  
    return true
})

let REGISTER = async function( req, res, next ){
    
    let validate = new Validator(req.body, {
        name    : "required|minLength:2|maxLength:100",
        email   : "required|minLength:2|maxLength:100|email|unique:user,email",
        password: "required|minLength:6|maxLength:100|same:confirm",
        confirm : "required",
        gender  : "required|integer|min:1|max:2",
    },{
        'name.required'     : ":attribute is required",
        'name.minLength'    : ":attribute min length :arg0",
        'name.maxLength'    : ":attribute max length :arg0",
        'email.required'    : ":attribute is required",
        'email.minLength'   : ":attribute min length :arg0",
        'email.maxLength'   : ":attribute max length :arg0",
        'email.email'       : ":attribute is email",
        'email.unique'      : ":attribute is existed",
        'password.required' : ":attribute is required",
        'password.minLength': ":attribute min length :arg0",
        'password.maxLength': ":attribute max length :arg0",
        'password.same'     : ":attribute not matching confirm",
        'confirm.required'  : ":attribute is required",
        'gender.required'   : ":attribute is required",
        'gender.integer'    : ":attribute is number",
        'gender.min'        : ":attribute min :arg0",
        'gender.max'        : ":attribute max :arg0",
    });
     
    let matched = await validate.check()
    if (!matched) {
        req.errors = validate.errors
        return errorHelper.apiResponseErrorResource( req, res )
    }
    next()
}

let LOGIN = async function( req, res, next ){
    
    let validate = new Validator(req.body, {
        email   : "required|minLength:2|maxLength:100|email",
        password: "required|minLength:6|maxLength:100",
    },{
        'email.required'    : ":attribute is required",
        'email.minLength'   : ":attribute min length :arg0",
        'email.maxLength'   : ":attribute max length :arg0",
        'email.email'       : ":attribute is email",
        'password.required' : ":attribute is required",
        'password.minLength': ":attribute min length :arg0",
        'password.maxLength': ":attribute max length :arg0",
    });
     
    let matched = await validate.check()
    if (!matched) {
        req.errors = validate.errors
        return errorHelper.apiResponseErrorResource( req, res )
    }
    next()
}

let REFRESH = async function( req, res, next ){
    
    let validate = new Validator(req.body, {
        token   : "required|minLength:20|maxLength:3000",
    },{
        'token.required'    : ":attribute is required",
        'token.minLength'   : ":attribute min length :arg0",
        'token.maxLength'   : ":attribute max length :arg0",
    });
     
    let matched = await validate.check()
    if (!matched) {
        req.errors = validate.errors
        return errorHelper.apiResponseErrorResource( req, res )
    }
    next()
}


let REGISTER_NOTIFY = async function( req, res, next ){
    
    let validate = new Validator(req.body, {
        token   : "required|minLength:20|maxLength:3000",
        device : "required"
    },{
        'token.required'    : ":attribute is required",
        'token.minLength'   : ":attribute min length :arg0",
        'token.maxLength'   : ":attribute max length :arg0",
    });
     
    let matched = await validate.check()
    if (!matched) {
        req.errors = validate.errors
        return errorHelper.apiResponseErrorResource( req, res )
    }
    next()
}
let SEND_NOTIFY = async function( req, res, next ){
    
    let validate = new Validator(req.body, {
        token   : "required|minLength:20|maxLength:3000",
        device : "required"
    },{
        'token.required'    : ":attribute is required",
        'token.minLength'   : ":attribute min length :arg0",
        'token.maxLength'   : ":attribute max length :arg0",
    });
     
    let matched = await validate.check()
    if (!matched) {
        req.errors = validate.errors
        return errorHelper.apiResponseErrorResource( req, res )
    }
    next()
}



module.exports = {
    REGISTER,
    LOGIN,
    REFRESH,
    REGISTER_NOTIFY,
    SEND_NOTIFY,
}