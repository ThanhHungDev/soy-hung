const { apiResponseIfRequestError } = require("../library/helper")

var Channel     = require("../model/Channel"),
    Message     = require("../model/Message"),
    CONFIG      = require("../config")

 
module.exports.channels = async function( req, res ){

    
    /// laravel call to action
    let { user } = req.query,
        response = {}
        
    apiResponseIfRequestError(req, res)

    /// code use async - await
    try {
        let channels = await Channel.find({ user: parseInt(user) })
            channels = channels.map( channel => channel.changeToOneUser())

        response.code    = 200
        response.message = response.internal_message = "チャンネル成功の設定"
        response.data    = channels
        return res.end(JSON.stringify(response))
    } catch (error) {

        response.code    = 500
        response.message = response.internal_message = error.message
        return res.end(JSON.stringify(response))
    }
}

