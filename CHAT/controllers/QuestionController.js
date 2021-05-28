const fetch    = require("node-fetch"),
      fs       = require('fs'),
      CONFIG   = require("../config"),
      Question = require("../models/Question")



let questions = async (req, res) => {
    
    let response = {},
        code     = 500

    try {

        let questions = await Question.find({})
        let QuestionResources = questions.map( q => q.toResources() )

        /// response 
        response.code             = 200
        response.data             = QuestionResources
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
    questions,
}
