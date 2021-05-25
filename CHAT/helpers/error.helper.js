

module.exports.apiResponseErrorResource = function( req, res ){

    let response = {}
    
    if(req.errors){
        
        let errors = Object.keys(req.errors).map( objKey => {
            
            let error = req.errors[objKey];
            return { error: objKey, ...error }
        })
        response.code             = 422,
        response.message          = "đã có lỗi xảy ra"
        response.internal_message = "đã có lỗi xảy ra"
        response.errors           = errors
        return res.status(response.code).json(response)
    }
}



