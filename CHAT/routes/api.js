'use strict'
/**
 * define
*/
const express = require("express")
const router  = express.Router()


const AuthMiddleWare       = require("../middlewares/AuthMiddleware"),
      GeneralMiddleware    = require("../middlewares/GeneralMiddleware"),
      RequestApiMiddleware = require("../middlewares/RequestApiMiddleware"),
      ImageMiddleware      = require('../middlewares/ImageMiddleware'),
      FileMiddleware       = require('../middlewares/FileMiddleware')

const AuthController     = require("../controllers/AuthController"),
      UserController     = require("../controllers/UserController"),
      FirebaseController = require("../controllers/FirebaseController"),
      ImageController    = require("../controllers/ImageController"),
      FileController     = require("../controllers/FileController"),
      CrawlerController  = require("../controllers/CrawlerController"),
      QuestionController = require("../controllers/QuestionController"),
      AnswerController   = require("../controllers/AnswerController")

/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = app => {

    app.use([ GeneralMiddleware.formatJsonApi ])

    ////////////////////////////////////////////////////////////////////////////
    /////////////////// Storage Image - File multer ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //upload single ví dụ như avatar...
    router.post( "/avatar", ImageMiddleware.uploadImage, ImageController.uploadAvatar)
    /// upload single ví dụ như cv...
    router.post( "/cv", FileMiddleware.uploadFile, FileController.uploadFile)
    //upload nhiều files ví dụ như hình ảnh của sản phẩm
    router.post( "/uploads", ImageMiddleware.uploadImages, ImageController.uploadMultipleImages)
    ////////////////////////////////////////////////////////////////////////////
    //////////////////// End Storage Image - File multer ///////////////////////
    ////////////////////////////////////////////////////////////////////////////


    router.post("/register", [ RequestApiMiddleware.REGISTER ], AuthController.register )
    router.post("/login", [ RequestApiMiddleware.LOGIN ], AuthController.login )
    router.post("/refresh", [ RequestApiMiddleware.REFRESH ], AuthController.refresh )
    

    ////////////////////////////////////////////////////////////////////////////
    /////////////////// Route Loged Success Use ////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    // Sử dụng authMiddleware.isAuth trước những api cần xác thực
    // List Protect APIs:
    router.get("/users/nologin", UserController.users )
    router.get("/crawler/ahaquiz", CrawlerController.crawlerAhaquiz )
    router.get("/crawler/questions/image", CrawlerController.cloneImage )
    router.get("/update/questions/image", CrawlerController.updateQuestionImage )
    
    router.get("/crawler/answers", CrawlerController.crawlerAnswer )
    router.get("/crawler/answers/update", CrawlerController.updateCrawlerAnswer )
    router.get("/crawler/answers/image/update", CrawlerController.updateUpdateImageAnswer )
    
    



    router.get("/questions", QuestionController.questions )
    router.get("/answer/:id", AnswerController.answer )

    router.use( AuthMiddleWare.isAuth )
    // List Protect APIs:
    router.get("/users", UserController.users )
    router.post("/users", UserController.users )


    router.post('/register/notification', [ RequestApiMiddleware.REGISTER_NOTIFY ], FirebaseController.registerNotification )
    router.get('/firebase/notification', [ RequestApiMiddleware.SEND_NOTIFY ], FirebaseController.firebaseNotification )
    ////////////////////////////////////////////////////////////////////////////
    /////////////////// End Route Loged Success Use ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    return app.use( "/api/v1/", router )
}
module.exports = initAPIs