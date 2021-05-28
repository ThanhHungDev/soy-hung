const fetch          = require("node-fetch"),
      fs             = require('fs'),
      CONFIG         = require("../config"),
      Question       = require("../models/Question"),
      path           = require('path'),
      downloadHelper = require('../helpers/donwload.helper')
      

let crawlerAhaquiz = async (req, res) => {
    
    let response = {},
        code     = 500

    try {

        let jsonQuestions = await fetchApiAhaQuestions()
        let questionsModel = jsonQuestions.map( async json => {
            let isExist = await Question.findOne({ iden: json.id })
            if( isExist ){
                return null    
            }
            return new Question({ name: json.name, image: json.image, iden: json.id }).save()
        })
        
        
        let questions = await Promise.all(questionsModel)
        questions = questions.filter( item => !!item )
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

let fetchApiAhaQuestions = async function(){

    const options = {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "vi,en-US;q=0.9,en;q=0.8",
            "cache-control": "max-age=0",
            "if-modified-since": "Thu, 27 May 2021 10:19:39 GMT",
            "if-none-match": "W/\"60af723b-801e\"",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    }

    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    return await new Promise((resolve, reject) => {
        fetch(CONFIG.API.ahaquiz, options)
        .then(res => res.text())
        .then(text => {
            text = (text + " ").trim()
            data = JSON.parse(text)
            resolve(data)
        })
        .catch(err => {
            console.log(`error`, err.message)
            reject(err)
        })
    })
}


let cloneImage = async (req, res) => {

    let response = {},
        code     = 500

    try {

        let questions = await Question.find({})
        let quess = questions.map( item => item.toResources())

  

        console.log(quess[0])
        for (let index = 0; index < quess.length; index++) {
            const item = quess[index];
            /// get img 
            const linkImg   = path.join(CONFIG.API.domain_ahaquiz, "images/" + item.image )
            const savedPath = path.join(__dirname, '../public/images/' + item.image )
            const savedDir  = path.dirname(savedPath)       
            console.log(linkImg, savedPath + " ---- "+ savedDir)                               // .split(path.sep).pop()
            if (!fs.existsSync(savedDir)) {
            
                fs.mkdirSync(savedDir, { recursive: true })
            }

            await downloadHelper.downloadX(linkImg, savedPath )
        }
        /// response 
        response.code             = 200
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
    crawlerAhaquiz,
    cloneImage,
}
