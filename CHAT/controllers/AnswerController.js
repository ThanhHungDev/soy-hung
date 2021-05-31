const fetch    = require("node-fetch"),
      fs       = require('fs'),
      mongoose = require('mongoose'),
      CONFIG   = require("../config"),
      Question = require("../models/Question"),
      Answer         = require("../models/Answer")


let answer = async (req, res) => {
    
    let { id } = req.params

    let response = {},
        code     = 500

    try {

        let answer = await Answer.findOne({ _id: mongoose.Types.ObjectId(id)} )

        response.code             = 200
        response.data             = answer.toResources()
        response.message          = "save data"
        response.internal_message = "save data successful"
        return res.status(response.code).json(response)

    } catch (error) {

        let err = { error: 'error', message: error.message }
        response.code             = code || 500
        response.message          = error.message
        response.internal_message = error.message
        response.errors           = [ err ]
        return res.status(response.code).json(response)
    }
}


module.exports = {
    answer,
}
