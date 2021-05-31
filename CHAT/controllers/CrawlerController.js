const fs             = require('fs'),
      path           = require('path'),
      fetch          = require("node-fetch"),
      downloadHelper = require('../helpers/donwload.helper'),
      CONFIG         = require("../config"),
      Question       = require("../models/Question"),
      Answer         = require("../models/Answer")
      
      

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
/**
 * @param  { String } url là đường dẫn api muốn fetch dạng GET 
 */
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





/// fetch api object answers
/**
 * @param  { String } link là đường dẫn api muốn fetch dạng GET 
 * @returns { String? } dạng json có thể dùng để JSON.parse hoặc null
 */
 let fetchApiAhaAnswers = async function(link){

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
        fetch(link, options)
        .then(res => res.text())
        .then(text => {
            text = (text + " ").trim()
            resolve(text)
        })
        .catch(err => {
            console.log(`error`, err.message)
            reject(null)
        })
    })
}

/**
 * @param  { String } pathUrl là đường dẫn để tạo được cái đưognf dẫn full url image ví dụ '40863/in.jpg'
 */
let donwloadAhaImg2Asset = async ( pathUrl ) => {

    pathUrl = pathUrl.trim()
    pathUrl = pathUrl.split(path.sep).filter(Boolean).join(path.sep)
    /// get img 
    const linkImg   = path.join(CONFIG.API.domain_ahaquiz, "images/" + pathUrl )
    const savedPath = path.join(__dirname, '../public/images/' + pathUrl )
    const savedDir  = path.dirname(savedPath)       
    console.log(linkImg, savedPath + " ---- "+ savedDir)
    if (!fs.existsSync(savedDir)) {
    
        fs.mkdirSync(savedDir, { recursive: true })
    }

    await downloadHelper.download(linkImg, savedPath )
}
let cloneImage = async (req, res) => {

    let response = {},
        code     = 500

    try {

        let questions = await Question.find({})
        let quess = questions.map( item => item.toResources())

  
        for (let index = 0; index < quess.length; index++) {
            const item = quess[index];
            /// get img 
            await donwloadAhaImg2Asset(item.image)
        }
        
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

let crawlerAnswer = async (req, res) => {

    let response = {},
        code     = 500

    try {

        let questions = await Question.find({})
        let quess = questions.map( item => item.toResources())

        let answersModel = questions.map( async question => { 
            //// //////////////////////////////
            const linkAPI = CONFIG.API.ahaquiz_answer + "/" + question.iden + ".json"
            let answer = await fetchApiAhaAnswers(linkAPI)
            
            return new Answer( { question: question._id, backup: answer }).save()
        })
        let answers = await Promise.all(answersModel)
            answers = answers.map( item => item.toResources() )

        
        response.code             = 200
        response.data             = answers
        response.message          = "save data answers"
        response.internal_message = "save answers successful"
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


let cloneResultAnswer = (jsonParent, key) => {

    let result = jsonParent[key]

    if( jsonParent.quiz.id.toString() == '85315'){
        console.log(jsonParent)
    }
    if( !result ){
        return null
    }
    //// loop result 
    let convert = result.map( res => {
        let { width, height, image, overlays } = res
        let data = { width, height, image }
        donwloadAhaImg2Asset(image)
        //// handle overlay
        data.overlays = overlays.map( item => {
            return {
                type           : item.type,
                text           : item.t,
                color          : item.c,
                vertical_align : item.va,
                text_align     : item.ta,
                font           : item.f,
                font_size      : item.fs,
                vertical_axis  : item.y,
                horizontal_axis: item.x,
                width          : item.w,
                height         : item.h,
            }
        })
        return data
    })
    return convert
}


let updateCrawlerAnswer = async (req, res) => {

    let response = {},
        code     = 500

    try {

        let answers = await Answer.find({})

        answersModel = answers.map( ans => {

            let json = JSON.parse(ans.backup)

            ans.name        = json.quiz.name
            ans.question_id = json.quiz.id.toString()
            ans.question    = ans.question
            ans.backup      = ans.backup
            ans.type        = json.quiz.type
            ans.unisex      = json.quiz.unisex
            
            if(parseInt(json.quiz.unisex)){
                let resultUni = cloneResultAnswer(json, 'result_unisex')
                if( resultUni ){ 
                    ans.result_unisex = resultUni
                }
            }else{
                
                let resultFem = cloneResultAnswer(json, 'result_female')
                if( resultFem ){ 
                    ans.result_female = resultFem
                }
                let resultMale = cloneResultAnswer(json, 'result_male')
                if( resultMale ){ 
                    ans.result_male = resultMale
                }
            }
            return ans.save()
        })
        let answersData = await Promise.all(answersModel)
            answersData = answersData.map( item => item.toResources() )
        
        response.code             = 200
        response.data             = answersData
        response.message          = "save data answers"
        response.internal_message = "save answers successful"
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

let updateQuestionImage = async (req, res) => {

    let response = {},
        code     = 500

    try {
        /// question image not true
        let questions = await Question.find({ })
        let promiseQuestion = questions.map( item => {
            if(item.image.indexOf("/images") != -1 ){
                return null;
            }
            item.image = "/images/" + item.image
            return item.save()
        })
        let dataQuesions = await Promise.all(promiseQuestion)
        let datas = dataQuesions.map( item => item.toResources() )

        response.code             = 200
        response.data             = datas
        response.message          = "update image question"
        response.internal_message = "update image question"
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


let updateUpdateImageAnswer = async (req, res) => {

    let response = {},
        code     = 500

    try {
        /// question image not true
        let answers = await Answer.find({ })
        let promiseAnswer = answers.map( item => {
            if(item.image && item.image.indexOf("/images") == -1 ){
                item.image = "/images/" + item.image
            }
            
            //// update réult
            if( parseInt(item.unisex) ){
                /// have réult unise
                item.result_unisex.map(uni => {
                    if(uni.image && uni.image.indexOf("/images") == -1 ){
                        uni.image = "/images/" + uni.image
                    }
                })
            }
            return item.save()
        })
        let dataAnswers = await Promise.all(promiseAnswer)
        let datas = dataAnswers.map( item => item.toResources() )

        response.code             = 200
        response.data             = datas
        response.message          = "update image question"
        response.internal_message = "update image question"
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
    crawlerAnswer,
    updateCrawlerAnswer,
    updateQuestionImage,
    updateUpdateImageAnswer,
}












// {
//     "quiz": {
//       "type": "random",
//       "unisex": "0",
//       "hideAds": false,
//       "language": "vi",
//       "id": 40857,
//       "name": "M\u1eb9 n\u00f3i g\u00ec v\u1ec1 b\u1ea1n?"
//     },
//     "result_male": [
//       {
//         "width": 800,
//         "height": 741,
//         "image": "40857\/1.jpg",
//         "overlays": [
//           {
//             "type": "text",
//             "t": "M\u1eb9 n\u00f3i g\u00ec v\u1ec1 b\u1ea1n?",
//             "c": "#ffffff",
//             "va": "middle",
//             "ta": "center",
//             "j": false,
//             "f": "Lora-Bold",
//             "fs": 55,
//             "si": false,
//             "sb": true,
//             "uc": true,
//             "x": 0,
//             "y": 0,
//             "w": 800,
//             "h": 102,
//             "a": 0,
//             "hl": 5
//           },
//           {
//             "type": "text",
//             "t": [
//               "nm_name \u00e0, m\u1eb9 nghe n\u00f3i con quen con nh\u00e0 cu\u1ed1i x\u00f3m \u00e0. B\u1ecf \u0111i nghe ch\u01b0a, n\u00f3 xinh \u0111\u1eb9p, nh\u00e0 gi\u00e0u c\u00f3 \u0111i\u1ec1u ki\u1ec7n con kh\u00f4ng c\u00f3 c\u1eeda \u0111\u00e2u",
//               "nm_name \u00e0, m\u1eb9 nghe n\u00f3i con quen con nh\u00e0 cu\u1ed1i x\u00f3m \u0111\u00fang kh\u00f4ng, th\u00f4i b\u1ecf \u0111i con, nh\u00e0 n\u00f3 ngh\u00e8o, m\u00e0y \u0111\u1eebng l\u00e0m kh\u1ed5 n\u00f3 th\u00eam n\u1eefa",
//               "nm_name, th\u1ea5y con nay c\u0169ng ch\u0103m ch\u1ec9 h\u1ecdc h\u00e0nh \u0111\u1ea5y, \u0111\u1ee3t n\u00e0y ph\u1ea3i c\u00f3 th\u00e0nh t\u00edch t\u1ed1t cho m\u1eb9 \u0111\u1ea5y?",
//               "nm_name, con c\u00f3 m\u1ed7i vi\u1ec7c \u0103n v\u1edbi h\u1ecdc c\u0169ng kh\u00f4ng xong, ch\u1ec9 c\u00f3 xin ti\u1ec1n l\u00e0 gi\u1ecfi",
//               "nm_name, n\u1ebfu c\u00f3 gi\u1ea3i cho ng\u01b0\u1eddi l\u01b0\u1eddi nh\u1ea5t ch\u1eafc kh\u00f4ng ai d\u00e1m tranh v\u1edbi con \u0111\u00e2u",
//               "nm_name, h\u1ecdc h\u00e0nh th\u00ec h\u01a1i ch\u1ec3nh m\u1ea3ng ch\u1ee9 ch\u01a1i \u0111i\u1ec7n t\u1eed th\u00ec c\u1ea3 x\u00f3m kh\u00f4ng ai b\u1eb1ng con",
//               "nm_name, m\u00e0y nh\u00ecn con ng\u01b0\u1eddi ta xem, n\u00f3 th\u00ec h\u1ecdc h\u00e0nh ch\u0103m ch\u1ec9, m\u00e0y su\u1ed1t ng\u00e0y ch\u1ebft d\u00ed v\u00f4 c\u00e1i di\u1ec7n tho\u1ea1i",
//               "Con v\u1edbi ch\u1ea3 c\u00e1i. La n\u00f3 c\u00f3 nghe bao gi\u1edd \u0111\u00e2u, c\u1ee9 c\u00e3i m\u1eb9 nhem nh\u1ebbm",
//               "nm_name \u00e0, thay \u0111\u1ed5i t\u00ednh n\u1ebft l\u1ea1i \u0111i con \u1ea1, t\u00ednh nh\u01b0 v\u1eady ma n\u00f3 th\u00e8m l\u1ea5y",
//               "nm_name \u00e0, kh\u00f4ng ch\u1ecbu h\u1ecdc h\u00e0nh \u0111i, r\u1ed3i sau n\u00e0y ra \u0111\u01b0\u1eddng x\u00fac r\u00e1c m\u00e0 \u0103n con \u1ea1!",
//               "Su\u1ed1t ng\u00e0y \u0111i ch\u01a1i, con c\u00f3 gi\u1ecfi th\u00ec \u0111i lu\u00f4n \u0111i...",
//               "nm_name \u00e0, sao m\u00e0y to\u00e0n ti\u00eau ti\u1ec1n v\u00e0o nh\u1eefng th\u1ee9 v\u00f4 b\u1ed5 v\u1eady, ti\u1ebft ki\u1ec7m l\u1ea1i \u0111i nha!",
//               "Con c\u00e1i g\u00ec ra \u0111\u01b0\u1eddng m\u1eb7c \u0111\u1ed3 cho \u0111\u00e0ng ho\u00e0ng v\u00e0o, kh\u00f4ng th\u00ec kh\u00f4ng c\u00f3 ma n\u00e0o n\u00f3 th\u00e8m l\u1ea5y",
//               "nm_name, con c\u00f2n nh\u1ecf th\u00ec lo h\u1ecdc \u0111i, c\u1ea5m y\u00eau \u0111\u01b0\u01a1ng nh\u0103ng nh\u00edt nghe ch\u01b0a?",
//               "nm_name \u00e0, b\u00e9o th\u1ebf \u0103n v\u1eeba th\u00f4i, kh\u00f4ng l\u1ea1i th\u00e1nh su m\u00f4 \u0111\u1ea5y con \u1ea1",
//               "nm_name, t\u1eebng n\u00e0y tu\u1ed5i r\u1ed3i m\u00e0 ch\u01b0a ch\u1ecbu l\u1eadp gia \u0111\u00ecnh, m\u00e0y thu x\u1ebfp \u0111\u1ed3 ra kh\u1ecfi nh\u00e0 l\u00e0 v\u1eeba con \u1ea1!",
//               "nm_name ngh\u1ec9 vi\u1ec7c \u0111i, l\u00e0m l\u1ee5ng g\u00ec t\u1ea7m n\u00e0y n\u1eefa. B\u1ed1 m\u1eb9 gi\u1ea3 ngh\u00e8o \u0111\u1ec3 con bi\u1ebft ch\u1ecbu th\u01b0\u01a1ng ch\u1ecbu kh\u00f3 th\u00f4i",
//               "nm_name, khi n\u00e0o m\u1edbi th\u00f4i l\u00ean m\u1ea1ng ch\u00e9m gi\u00f3 h\u1ea3 con? B\u1ed1 m\u1eb9 c\u00f3 c\u00f3 d\u1ea1y m\u00e0y th\u1ebf \u0111\u00e2u",
//               "nm_name, b\u1eb1ng tu\u1ed5i n\u00e0y ma\u0300y \u0111em \u0111\u01b0\u0301a na\u0300o v\u00ea\u0300 nha\u0300 cu\u0303ng \u0111\u01b0\u01a1\u0323c. Kh\u00f4ng quan tro\u0323ng nam n\u01b0\u0303, ma\u0300y thi\u0301ch thi\u0300 b\u00f4\u0301 me\u0323 c\u00e2n h\u1ebft",
//               "nm_name \u00e0, \u0111\u1ebfn r\u00e1c c\u00f2n c\u00f3 ng\u01b0\u1eddi h\u1ed1t. Th\u1ebf m\u00e0 m\u00e0y ch\u1eb3ng c\u00f3 1 ma n\u00e0o theo, con v\u1edbi ch\u1ea3 c\u00e1i, n\u1eabu c\u1ea3 ru\u1ed9t gan",
//               "nm_name \u00e0, th\u1eddi gian th\u1ea5m tho\u00e1t th\u00f4i \u0111\u01b0a. Thanh xu\u00e2n g\u1ea7n h\u1ebft sao con ch\u01b0a gi\u00e0u",
//               "nm_name \u00e0, th\u1eddi gian th\u1ea5m tho\u00e1t th\u00f4i \u0111\u01b0a. Thanh xu\u00e2n g\u1ea7n h\u1ebft sao con ch\u01b0a l\u1ea5y v\u1ee3",
//               "nm_name \u00e0, ch\u1eafc con th\u00edch \u0111i \u0111\u00e1m gi\u1ed7 h\u01a1n \u0111\u00e1m c\u01b0\u1edbi con nh\u1ec9? V\u00ec \u1edf \u0111\u1ea5y kh\u00f4ng ai h\u1ecfi : Bao gi\u1edd \u0111\u1ebfn l\u01b0\u1ee3t con",
//               "nm_name \u00e0, sao m\u1eb9 k\u1ebft b\u1ea1n facebook con ho\u00e0i m\u00e0 ch\u1eb3ng th\u1ea5y \u0111\u1ed3ng \u00fd l\u00e0 sao con??",
//               "nm_name, con kh\u00f4ng c\u1ea7n l\u00ean m\u1ea1ng r\u1ea3i th\u00ednh n\u1eefa, v\u1ec1 \u0111\u00e2y m\u1eb9 l\u00e0m mai cho m\u1ea5y \u0111\u1ee9a trong x\u00f3m n\u00e0y",
//               "nm_name, kh\u00f4ng c\u00f3 ti\u1ec1n m\u1edbi ch\u1ebft ch\u1ee9 kh\u00f4ng c\u00f3 b\u1ed3 kh\u00f4ng ch\u1ebft \u0111\u01b0\u1ee3c \u0111\u00e2u con \u1ea1!",
//               "nm_name \u00e0, con nh\u00e0 ng\u01b0\u1eddi ta h\u1ecdc sinh gi\u1ecfi \u0111\u1ea7y ra! Sao con m\u1eb9 c\u1ee9 l\u1eb9t \u0111\u1eb9t h\u1ecdc sinh kh\u00e1 ho\u00e0i v\u1eady?? H\u1ea3?",
//               "nm_name \u00e0, con nh\u00e0 ng\u01b0\u1eddi ta h\u1ecdc l\u00ean th\u1ea1c s\u0129, ti\u1ebfn s\u0129 r\u1ed3i, con nh\u00e0 m\u00ecnh \u0111\u00e3 l\u01b0\u1eddi h\u1ecdc l\u1ea1i c\u00f2n th\u1ea5t nghi\u1ec7p.",
//               "nm_name \u00e0, con nh\u00e0 ng\u01b0\u1eddi l\u00e0m nhi\u1ec1u ti\u1ec1n v\u1ec1 bi\u1ebfu cho cha m\u1eb9 th\u1ee9 n\u00e0y th\u1ee9 kia, c\u00f2n m\u00e0y \u0111\u00e3 c\u00f3 g\u00ec cho m\u1eb9 ch\u01b0a con??",
//               "nm_name \u00e0, th\u1ea5t t\u00ecnh kh\u00f4ng ch\u1ebft, th\u1ea5t nghi\u1ec7p m\u1edbi ch\u1ebft \u0111\u00f3 con \u1ea1! Sau n\u00e0y c\u00f3 ti\u1ec1n th\u00ec kh\u1ed1i \u0111\u1ee9a theo...",
//               "nm_name \u00e0, m\u1eb9 nghe n\u00f3i con b\u00e9 g\u1ea7n nh\u00e0 m\u00ecnh \u00e0. B\u1ecf \u0111i nghe ch\u01b0a, n\u00f3 \u0111\u1eb9p nh\u00e0 gi\u00e0u c\u00f3 \u0111i\u1ec1u ki\u1ec7n con kh\u00f4ng c\u00f3 c\u1eeda \u0111\u00e2u",
//               "nm_name \u00e0, m\u1eb9 nghe n\u00f3i con quen con nh\u00e0 cu\u1ed1i x\u00f3m \u0111\u00fang kh\u00f4ng, th\u00f4i b\u1ecf \u0111i con, nh\u00e0 n\u00f3 ngh\u00e8o, m\u00e0y \u0111\u1eebng l\u00e0m kh\u1ed5 n\u00f3 th\u00eam n\u1eefa"
//             ],
//             "c": "#33220f",
//             "va": "middle",
//             "ta": "center",
//             "j": false,
//             "f": "arial",
//             "fs": 35,
//             "si": false,
//             "sb": false,
//             "uc": false,
//             "x": 228,
//             "y": 159,
//             "w": 472,
//             "h": 129,
//             "a": 0,
//             "hl": 0
//           }
//         ]
//       }
//     ],
//     "result_female": [
//       {
//         "width": 800,
//         "height": 741,
//         "image": "40857\/2.jpg",
//         "overlays": [
//           {
//             "type": "text",
//             "t": "M\u1eb9 n\u00f3i g\u00ec v\u1ec1 b\u1ea1n?",
//             "c": "#ffffff",
//             "va": "middle",
//             "ta": "center",
//             "j": false,
//             "f": "Lora-Bold",
//             "fs": 55,
//             "si": false,
//             "sb": true,
//             "uc": true,
//             "x": 0,
//             "y": 0,
//             "w": 800,
//             "h": 102,
//             "a": 0,
//             "hl": 5
//           },
//           {
//             "type": "text",
//             "t": [
//               "nm_name \u00e0, m\u1eb9 nghe n\u00f3i con quen th\u1eb1ng nh\u00e0 cu\u1ed1i x\u00f3m \u0111\u00fang kh\u00f4ng, th\u00f4i b\u1ecf \u0111i con, nh\u00e0 n\u00f3 ngh\u00e8o, m\u00e0y \u0111\u1eebng l\u00e0m kh\u1ed5 n\u00f3 th\u00eam n\u1eefa",
//               "nm_name \u00e0, m\u1eb9 nghe n\u00f3i con quen th\u1eb1ng nh\u00e0 cu\u1ed1i x\u00f3m \u00e0. B\u1ecf \u0111i nghe ch\u01b0a, n\u00f3 \u0111\u1eb9p trai nh\u00e0 gi\u00e0u c\u00f3 \u0111i\u1ec1u ki\u1ec7n con kh\u00f4ng c\u00f3 c\u1eeda \u0111\u00e2u",
//               "nm_name, th\u1ea5y con nay c\u0169ng ch\u0103m ch\u1ec9 h\u1ecdc h\u00e0nh \u0111\u1ea5y, \u0111\u1ee3t n\u00e0y ph\u1ea3i c\u00f3 th\u00e0nh t\u00edch t\u1ed1t cho m\u1eb9 \u0111\u1ea5y?",
//               "nm_name, con c\u00f3 m\u1ed7i vi\u1ec7c \u0103n v\u1edbi h\u1ecdc c\u0169ng kh\u00f4ng xong, ch\u1ec9 c\u00f3 xin ti\u1ec1n l\u00e0 gi\u1ecfi",
//               "nm_name, n\u1ebfu c\u00f3 gi\u1ea3i cho ng\u01b0\u1eddi l\u01b0\u1eddi nh\u1ea5t ch\u1eafc kh\u00f4ng ai d\u00e1m tranh v\u1edbi con \u0111\u00e2u",
//               "nm_name, h\u1ecdc h\u00e0nh th\u00ec h\u01a1i ch\u1ec3nh m\u1ea3ng ch\u1ee9 ch\u01a1i \u0111i\u1ec7n t\u1eed th\u00ec c\u1ea3 x\u00f3m kh\u00f4ng ai b\u1eb1ng con",
//               "nm_name, m\u00e0y nh\u00ecn con ng\u01b0\u1eddi ta xem, n\u00f3 th\u00ec h\u1ecdc h\u00e0nh ch\u0103m ch\u1ec9, m\u00e0y su\u1ed1t ng\u00e0y ch\u1ebft d\u00ed v\u00f4 c\u00e1i di\u1ec7n tho\u1ea1i",
//               "Con v\u1edbi ch\u1ea3 c\u00e1i. La n\u00f3 c\u00f3 nghe bao gi\u1edd \u0111\u00e2u, c\u1ee9 c\u00e3i m\u1eb9 nhem nh\u1ebbm",
//               "nm_name \u00e0, thay \u0111\u1ed5i t\u00ednh n\u1ebft l\u1ea1i \u0111i con \u1ea1, t\u00ednh nh\u01b0 v\u1eady ma n\u00f3 th\u00e8m l\u1ea5y",
//               "nm_name \u00e0, kh\u00f4ng ch\u1ecbu h\u1ecdc h\u00e0nh \u0111i, r\u1ed3i sau n\u00e0y ra \u0111\u01b0\u1eddng x\u00fac r\u00e1c m\u00e0 \u0103n con \u1ea1!",
//               "nm_name \u00e0, sao m\u00e0y to\u00e0n ti\u00eau ti\u1ec1n v\u00e0o nh\u1eefng th\u1ee9 v\u00f4 b\u1ed5 v\u1eady, ti\u1ebft ki\u1ec7m l\u1ea1i \u0111i nha!",
//               "Con c\u00e1i g\u00ec ra \u0111\u01b0\u1eddng m\u1eb7c \u0111\u1ed3 cho \u0111\u00e0ng ho\u00e0ng v\u00e0o, kh\u00f4ng th\u00ec kh\u00f4ng c\u00f3 ma n\u00e0o n\u00f3 th\u00e8m l\u1ea5y",
//               "nm_name, con c\u00f2n nh\u1ecf th\u00ec lo h\u1ecdc \u0111i, c\u1ea5m y\u00eau \u0111\u01b0\u01a1ng nh\u0103ng nh\u00edt nghe ch\u01b0a?",
//               "nm_name \u00e0, b\u00e9o th\u1ebf \u0103n v\u1eeba th\u00f4i, kh\u00f4ng l\u1ea1i th\u00e1nh su m\u00f4 \u0111\u1ea5y con \u1ea1",
//               "nm_name, t\u1eebng n\u00e0y tu\u1ed5i r\u1ed3i m\u00e0 ch\u01b0a ch\u1ecbu l\u1eadp gia \u0111\u00ecnh, m\u00e0y thu x\u1ebfp \u0111\u1ed3 ra kh\u1ecfi nh\u00e0 l\u00e0 v\u1eeba con \u1ea1!",
//               "nm_name ngh\u1ec9 vi\u1ec7c \u0111i, l\u00e0m l\u1ee5ng g\u00ec t\u1ea7m n\u00e0y n\u1eefa. B\u1ed1 m\u1eb9 gi\u1ea3 ngh\u00e8o \u0111\u1ec3 con bi\u1ebft ch\u1ecbu th\u01b0\u01a1ng ch\u1ecbu kh\u00f3 th\u00f4i",
//               "nm_name, khi n\u00e0o m\u1edbi th\u00f4i l\u00ean m\u1ea1ng ch\u00e9m gi\u00f3 h\u1ea3 con? B\u1ed1 m\u1eb9 c\u00f3 c\u00f3 d\u1ea1y m\u00e0y th\u1ebf \u0111\u00e2u",
//               "nm_name, b\u1eb1ng tu\u1ed5i n\u00e0y ma\u0300y \u0111em \u0111\u01b0\u0301a na\u0300o v\u00ea\u0300 nha\u0300 cu\u0303ng \u0111\u01b0\u01a1\u0323c. Kh\u00f4ng quan tro\u0323ng nam n\u01b0\u0303, ma\u0300y thi\u0301ch thi\u0300 b\u00f4\u0301 me\u0323 c\u00e2n h\u1ebft",
//               "nm_name \u00e0, \u0111\u1ebfn r\u00e1c c\u00f2n c\u00f3 ng\u01b0\u1eddi h\u1ed1t. Th\u1ebf m\u00e0 m\u00e0y ch\u1eb3ng c\u00f3 ma n\u00e0o th\u00e8m, con v\u1edbi ch\u1ea3 c\u00e1i, n\u1eabu c\u1ea3 ru\u1ed9t gan",
//               "nm_name \u00e0, th\u1eddi gian th\u1ea5m tho\u00e1t th\u00f4i \u0111\u01b0a. Thanh xu\u00e2n g\u1ea7n h\u1ebft sao con ch\u01b0a gi\u00e0u",
//               "nm_name \u00e0, th\u1eddi gian th\u1ea5m tho\u00e1t th\u00f4i \u0111\u01b0a. Thanh xu\u00e2n g\u1ea7n h\u1ebft sao con ch\u01b0a ch\u1ed1ng l\u1ea7y",
//               "nm_name \u00e0, ch\u1eafc con th\u00edch \u0111i \u0111\u00e1m gi\u1ed7 h\u01a1n \u0111\u00e1m c\u01b0\u1edbi con nh\u1ec9? V\u00ec \u1edf \u0111\u1ea5y kh\u00f4ng ai h\u1ecfi : Bao gi\u1edd \u0111\u1ebfn l\u01b0\u1ee3t con",
//               "nm_name \u00e0, sao m\u1eb9 k\u1ebft b\u1ea1n facebook con ho\u00e0i m\u00e0 ch\u1eb3ng th\u1ea5y \u0111\u1ed3ng \u00fd l\u00e0 sao con??",
//               "nm_name, con kh\u00f4ng c\u1ea7n l\u00ean m\u1ea1ng r\u1ea3i th\u00ednh n\u1eefa, v\u1ec1 \u0111\u00e2y m\u1eb9 l\u00e0m mai cho m\u1ea5y \u0111\u1ee9a thanh ni\u00ean trong x\u00f3m",
//               "nm_name, kh\u00f4ng c\u00f3 ti\u1ec1n m\u1edbi ch\u1ebft ch\u1ee9 kh\u00f4ng c\u00f3 b\u1ed3 kh\u00f4ng ch\u1ebft \u0111\u01b0\u1ee3c \u0111\u00e2u con \u1ea1!",
//               "nm_name \u00e0, con nh\u00e0 ng\u01b0\u1eddi ta h\u1ecdc sinh gi\u1ecfi \u0111\u1ea7y ra! Sao con m\u1eb9 c\u1ee9 l\u1eb9t \u0111\u1eb9t h\u1ecdc sinh kh\u00e1 ho\u00e0i v\u1eady?? H\u1ea3?",
//               "nm_name \u00e0, con nh\u00e0 ng\u01b0\u1eddi ta h\u1ecdc l\u00ean th\u1ea1c s\u0129, ti\u1ebfn s\u0129 r\u1ed3i, con nh\u00e0 m\u00ecnh \u0111\u00e3 l\u01b0\u1eddi h\u1ecdc l\u1ea1i c\u00f2n th\u1ea5t nghi\u1ec7p.",
//               "nm_name \u00e0, con g\u00e1i nh\u00e0 ng\u01b0\u1eddi ta th\u00ec c\u1ea7m k\u1ef3 thi h\u1ecda. Con nh\u00e0 m\u00ecnh th\u00ec \u0103n ng\u1ee7 ch\u01a1i \u0111i chung \u0111\u01b0\u1eddng.",
//               "nm_name, con g\u00e1i nh\u00e0 ng\u01b0\u1eddi ta c\u01b0\u1eddi l\u00ean th\u00ec tuy\u1ec7t s\u1eafc \u0111\u1ed9ng l\u00f2ng ng\u01b0\u1eddi. Con nh\u00e0 m\u00ecnh c\u01b0\u1eddi nh\u01b0 s\u1ea5m r\u1ec1n vang c\u1ea3 tr\u1eddi \u0111\u1ea5t.",
//               "nm_name \u00e0, b\u1ed1 th\u00ec \u0111\u1eb9p trai cao c\u00e1o, m\u1eb9 th\u00ec xinh \u0111\u1eb9p m\u00e0 sinh ra m\u00e0y kh\u00f4ng gi\u1ed1ng ai, sao m\u00e0 x\u1ea5u v\u1eady con?",
//               "nm_name \u00e0, con nh\u00e0 ng\u01b0\u1eddi l\u00e0m nhi\u1ec1u ti\u1ec1n v\u1ec1 bi\u1ebfu cho cha m\u1eb9 th\u1ee9 n\u00e0y th\u1ee9 kia, c\u00f2n m\u00e0y \u0111\u00e3 c\u00f3 g\u00ec cho m\u1eb9 ch\u01b0a con??",
//               "nm_name \u00e0, th\u1ea5t t\u00ecnh kh\u00f4ng ch\u1ebft, th\u1ea5t nghi\u1ec7p m\u1edbi ch\u1ebft \u0111\u00f3 con \u1ea1! Sau n\u00e0y c\u00f3 ti\u1ec1n th\u00ec kh\u1ed1i \u0111\u1ee9a theo...",
//               "nm_name \u00e0, m\u1eb9 nghe n\u00f3i con quen th\u1eb1ng nh\u00e0 cu\u1ed1i x\u00f3m \u0111\u00fang kh\u00f4ng, th\u00f4i b\u1ecf \u0111i con, nh\u00e0 n\u00f3 ngh\u00e8o, m\u00e0y \u0111\u1eebng l\u00e0m kh\u1ed5 n\u00f3 th\u00eam n\u1eefa",
//               "nm_name \u00e0, m\u1eb9 nghe n\u00f3i con quen th\u1eb1ng nh\u00e0 cu\u1ed1i x\u00f3m. B\u1ecf \u0111i nghe ch\u01b0a, n\u00f3 \u0111\u1eb9p trai nh\u00e0 gi\u00e0u c\u00f3 \u0111i\u1ec1u ki\u1ec7n con kh\u00f4ng c\u00f3 c\u1eeda \u0111\u00e2u"
//             ],
//             "c": "#33220f",
//             "va": "middle",
//             "ta": "center",
//             "j": false,
//             "f": "arial",
//             "fs": 35,
//             "si": false,
//             "sb": false,
//             "uc": false,
//             "x": 228,
//             "y": 159,
//             "w": 472,
//             "h": 129,
//             "a": 0,
//             "hl": 0
//           }
//         ]
//       }
//     ]
//   }
























// {
//     "quiz": {
//       "type": "random",
//       "unisex": "1",
//       "hideAds": false,
//       "language": "vi",
//       "id": 10894,
//       "name": "B\u00e0 Ph\u01b0\u01a1ng H\u1eb1ng n\u00f3i g\u00ec v\u1ec1 b\u1ea1n?"
//     },
//     "result_unisex": [
//       {
//         "width": 800,
//         "height": 1000,
//         "image": "10894\/10894-in.jpg",
//         "overlays": [
//           {
//             "type": "text",
//             "t": "B\u00e0 Ph\u01b0\u01a1ng H\u1eb1ng n\u00f3i g\u00ec v\u1ec1 b\u1ea1n?",
//             "c": "#000000",
//             "va": "middle",
//             "ta": "center",
//             "j": false,
//             "f": "arial",
//             "fs": 42,
//             "si": false,
//             "sb": true,
//             "uc": true,
//             "x": 0,
//             "y": 4,
//             "w": 800,
//             "h": 86,
//             "a": 0,
//             "hl": 0
//           },
//           {
//             "type": "text",
//             "t": [
//               "Nhi\u1ec1u khi tui th\u1ea5y nm_name b\u1ea5t l\u1ef1c qu\u00e1 qu\u00ed z\u1ecb \u01a1i! Ngay c\u1ea3 vi\u1ec7c l\u00e0m b\u1ea3n th\u00e2n b\u1edbt \u0111\u1eb9p m\u00e0 nm_name c\u0169ng kh\u00f4ng l\u00e0m \u0111\u01b0\u1ee3c!",
//               "N\u0103m nay nm_name g\u1eb7p r\u1ea5t nhi\u1ec1u nguy hi\u1ec3m \u0111\u00f3 nha qu\u00ed z\u1ecb. Nguy\u00ean nh\u00e2n ch\u00ednh l\u00e0 nm_name b\u1ecb sao \u0111\u00f4 la \u0111\u00e8 n\u1eb7ng qu\u00e1 qu\u00ed z\u1ecb \u1ea1!",
//               "nm_name \u00e0! Th\u1ea5y chuy\u1ec7n g\u00ec b\u1ea5t b\u00ecnh th\u00ec nh\u1edb thao t\u00e1c ch\u1ee5p m\u00e0n h\u00ecnh r\u1ed3i g\u1eedi ngay cho tui, tui \"take care\" \u0111\u1ea7y \u0111\u1ee7 cho nha.",
//               "Tui n\u00f3i nm_name nghe n\u00e8! Th\u00e0nh c\u00f4ng h\u00e3y coi l\u00e0 h\u1ea1nh ph\u00fac, th\u1ea5t b\u1ea1i h\u00e3y coi l\u00e0 tr\u1ea3i nghi\u1ec7m. Ch\u01a1i kh\u00f4 m\u00e1u th\u00ec b\u01a1m m\u00e1u ch\u01a1i ti\u1ebfp ph\u1ea3i kh\u00f4ng qu\u00ed z\u1ecb.",
//               "Tui n\u00f3i nm_name n\u00f3 hi\u1ec1n nh\u01b0ng kh\u00f4ng d\u1ec5 b\u1eaft n\u1ea1t nha qu\u00ed z\u1ecb! Ng\u01b0\u1eddi ta \u0111\u1ee5ng th\u00ec n\u00f3 ch\u1ea1m, ng\u01b0\u1eddi ta c\u1ea3m th\u00ec n\u00f3 ph\u1ea3i x\u00fac, ng\u01b0\u1eddi ta mu\u1ed1n n\u00f3 s\u1ee5p th\u00ec n\u00f3 cho \u0111\u1ed5 lu\u00f4n \u0111\u1ea5y!",
//               "Tui \u0111\u1eb9p m\u00e0 ph\u1ea3i kh\u00f4ng qu\u00ed z\u1ecb? V\u1eady m\u00e0 nm_name \u0111\u01b0a h\u00ecnh tui l\u00ean m\u1ea1ng nh\u01b0 b\u00e0 ngo\u1ea1i tui v\u1eady \u0111\u00f3 qu\u00ed z\u1ecb!",
//               "nm_name tui n\u00f3i n\u00e8... nm_name \u0111\u1eebng c\u00f3 nhi\u1ec1u chuy\u1ec7n nh\u01b0ng m\u00e0 n\u1ebfu chuy\u1ec7n nhi\u1ec1u th\u00ec c\u1ee9 \u0111\u1ec3 nm_name n\u00f3i ph\u1ea3i kh\u00f4ng qu\u00ed z\u1ecb?",
//               "Qu\u00ed z\u1ecb \u01a1i! \u0110\u1ec3 t\u00ecm ra ch\u00e2n l\u00fd cu\u1ed9c s\u1ed1ng, nm_name s\u1eb5n s\u00e0ng b\u1ecf ra 2000 t\u1ef7. Ai d\u00e1m nh\u01b0 nm_name kh\u00f4ng qu\u00ed z\u1ecb?",
//               "Tui n\u00f3i qu\u00ed z\u1ecb nghe, ng\u01b0\u1eddi ta n\u00f3i im l\u1eb7ng l\u00e0 V\u00e0ng c\u00f2n nm_name n\u00f3i l\u00e0 Kim C\u01b0\u01a1ng \u0111\u00f3 qu\u00ed z\u1ecb",
//               "T\u00ednh t\u1edbi \u0111\u1ed9 gi\u00e0u th\u00ec nm_name l\u00e0 ng\u01b0\u1eddi gi\u00e0u nh\u1ea5t, kh\u00f4ng nh\u1eefng gi\u00e0u v\u1ec1 ti\u1ec1n b\u1ea1c m\u00e0 c\u00f2n gi\u00e0u c\u1ea3 t\u00ecnh c\u1ea3m n\u1eefa qu\u00ed z\u1ecb \u1ea1",
//               "Cu\u1ed9c \u0111\u1eddi c\u1ee7a tui s\u1ed1ng t\u1edbi h\u01a1n 50 n\u0103m r\u1ed3i tui ch\u01b0a th\u1ea5y ai m\u00e0 \u0111\u1eb9p c\u1ea3 ng\u01b0\u1eddi l\u1eabn n\u1ebft nh\u01b0 nm_name h\u1ebft qu\u00ed z\u1ecb",
//               "nm_name n\u00f3 th\u00f4ng minh l\u1ea1i gi\u1ecfi giang, n\u00f3 m\u00e0 v\u1ec1 \u0111\u1ed9i CEO c\u1ee7a tui th\u00ec ch\u1eafc tui ph\u1ea3i g\u1ecdi n\u00f3 l\u00e0 s\u01b0 ph\u1ee5 r\u1ed3i qu\u00ed z\u1ecb",
//               "nm_name n\u00f3 th\u00f4ng minh l\u1ea1i gi\u1ecfi giang, tui ch\u1ec9 \u01b0\u1edbc g\u00ec m\u1ed9t ng\u00e0y n\u00e0o \u0111\u00f3 n\u00f3 ch\u1ea5p nh\u1eadn l\u00e0m con nu\u00f4i c\u1ee7a tui th\u00f4i qu\u00ed z\u1ecb \u1ea1",
//               "N\u00f3i th\u1eadt v\u1edbi qu\u00ed z\u1ecb ch\u1ee9 tui \u0111\u1ec3 \u00fd nm_name t\u1eeb l\u00e2u l\u1eafm r\u1ed3i, gi\u1edd m\u1edbi c\u00f3 d\u1ecbp n\u00f3i ra. nm_name l\u00e0 ng\u01b0\u1eddi c\u00f3 c\u1ea3 t\u00e0i l\u1eabn \u0111\u1ee9c ai m\u00e0 l\u1ea5y \u0111\u01b0\u1ee3c n\u00f3 th\u00ec ph\u00fac 3 \u0111\u1eddi",
//               "H\u00f4m qua tui c\u00f3 xem 1 qu\u1ebb th\u1ea5y nm_name c\u00f3 ng\u01b0\u1eddi y\u00eau r\u1ed3i m\u00e0 gi\u1ea5u nha qu\u00ed z\u1ecb. V\u1eady m\u00e0 su\u1ed1t ng\u00e0y than \u1ebf. ",
//               "\u0110\u00eam qua tui m\u01a1 th\u1ea5y nm_name sau n\u00e0y th\u00e0nh \u0111\u1ea1t l\u1eafm qu\u00ed z\u1ecb. \u0110\u1ee9ng tr\u00ean v\u1ea1n ng\u01b0\u1eddi lu\u00f4n nha qu\u00ed z\u1ecb. D\u1ea1, ngh\u1ec1 l\u00e0 l\u1ee3p m\u00e1i t\u00f4n.",
//               "Qu\u00ed z\u1ecb \u01a1i! \u0110\u00eam qua tui n\u1eb1m m\u01a1 t\u01b0\u01a1ng lai c\u1ee7a nm_name n\u00f3 gi\u00e0u l\u1eafm \u0111\u00f3 qu\u00ed z\u1ecb. Kim c\u01b0\u01a1ng h\u1ed9t xo\u00e0n \u0111\u1ed1ng \u0111\u1ed1ng \u0111ong b\u1eb1ng lon kh\u00f4ng nha qu\u00ed z\u1ecb.",
//               "Qu\u00ed z\u1ecb \u01a1i! \u0110\u00eam qua tui n\u1eb1m m\u01a1 t\u01b0\u01a1ng lai c\u1ee7a nm_name n\u00f3 gi\u00e0u l\u1eafm \u0111\u00f3 qu\u00ed z\u1ecb. Kim c\u01b0\u01a1ng h\u1ed9t xo\u00e0n ph\u1ea3i c\u00e2n b\u1eb1ng k\u00ed m\u1edbi ch\u1ecbu lu\u00f4n nha qu\u00ed z\u1ecb."
//             ],
//             "c": "#000000",
//             "va": "middle",
//             "ta": "center",
//             "j": false,
//             "f": "arial",
//             "fs": 40,
//             "si": false,
//             "sb": false,
//             "uc": false,
//             "x": 12,
//             "y": 779,
//             "w": 778,
//             "h": 212,
//             "a": 0,
//             "hl": 5
//           }
//         ]
//       },
//       {
//         "width": 800,
//         "height": 1000,
//         "image": "10894\/10894-in.jpg",
//         "overlays": [
//           {
//             "type": "text",
//             "t": "B\u00e0 Ph\u01b0\u01a1ng H\u1eb1ng n\u00f3i g\u00ec v\u1ec1 b\u1ea1n?",
//             "c": "#000000",
//             "va": "middle",
//             "ta": "center",
//             "j": false,
//             "f": "arial",
//             "fs": 42,
//             "si": false,
//             "sb": true,
//             "uc": true,
//             "x": 0,
//             "y": 4,
//             "w": 800,
//             "h": 86,
//             "a": 0,
//             "hl": 0
//           },
//           {
//             "type": "text",
//             "t": [
//               "Tui n\u00f3i c\u00e1i n\u00e0y nm_name tin hay kh\u00f4ng th\u00ec t\u00f9y nh\u01b0ng m\u00e0 \u0111\u00eam qua tui n\u1eb1m m\u01a1 th\u1ea5y ng\u01b0\u1eddi y\u00eau t\u01b0\u01a1ng lai c\u1ee7a nm_name gi\u00e0u l\u1eafm qu\u00ed z\u1ecb \u01a1i! Kim c\u01b0\u01a1ng h\u1ed9t xo\u00e0n c\u00e2n b\u1eb1ng k\u00ed lu\u00f4n nha qu\u00ed z\u1ecb",
//               "Qu\u00ed z\u1ecb \u01a1i! Qu\u00ed z\u1ecb c\u00f3 bi\u1ebft m\u1ed7i l\u00fac nm_name bu\u1ed3n th\u01b0\u1eddng l\u00e0m g\u00ec kh\u00f4ng qu\u00ed z\u1ecb? M\u1ed7i khi bu\u1ed3n nm_name th\u01b0\u1eddng \u0111em kim c\u01b0\u1eddng h\u1ed9t xo\u00e0n ra \u0111\u1ebfm cho \u0111\u1ee1 bu\u1ed3n \u0111\u00f3 qu\u00ed z\u1ecb \u00e0.",
//               "C\u00f3 m\u1ed9t s\u1ef1 th\u1eadt m\u00e0 h\u00f4m nay tui s\u1ebd ti\u1ebft l\u1ed9 v\u1edbi qu\u00ed z\u1ecb \u0111\u00f3 l\u00e0: nm_name l\u00e0 ng\u01b0\u1eddi gi\u00e0u nh\u1ea5t, gi\u1ecfi nh\u1ea5t, qu\u00ed z\u1ecb c\u00f3 tin hay kh\u00f4ng c\u0169ng \u0111\u1eebng n\u00e9m \u0111\u00e1 nm_name t\u1ed9i n\u00f3 nghe qu\u00ed z\u1ecb."
//             ],
//             "c": "#000000",
//             "va": "middle",
//             "ta": "center",
//             "j": false,
//             "f": "arial",
//             "fs": 36,
//             "si": false,
//             "sb": false,
//             "uc": false,
//             "x": 12,
//             "y": 779,
//             "w": 778,
//             "h": 212,
//             "a": 0,
//             "hl": 5
//           }
//         ]
//       }
//     ]
//   }