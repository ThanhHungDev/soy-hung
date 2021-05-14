
 
module.exports.apiResponseIfRequestError = function( req, res ){

    let response = {}
    
    if(req.errors){
        // {
        //     {"user":{"message":"user is required","rule":"required"}},
        //     {"id":{"message":"id is required","rule":"required"}}
        // }
        let errors = Object.keys(req.errors).map( objKey => {
            /// objKey example: user, id, ...
            /// error example: {"message":"user is required","rule":"required"}
            let error = req.errors[objKey];
            return { error: objKey, ...error }
        })
        response.code    = 422,
        response.message = "đã có lỗi xảy ra"
        response.errors  = errors
        return res.end(JSON.stringify(response))
    }
}


module.exports.apiResponseErrorResource = function( req, res ){

    let response = {}
    
    if(req.errors){
        
        let errors = Object.keys(req.errors).map( objKey => {
            
            let error = req.errors[objKey];
            return { error: objKey, ...error }
        })
        response.code    = 422,
        response.message = "đã có lỗi xảy ra"
        response.errors  = errors
        return res.end(JSON.stringify(response))
    }
}



