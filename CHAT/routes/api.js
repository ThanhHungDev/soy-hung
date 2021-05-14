/**
 * define
*/
const express = require("express")
const router  = express.Router()


const AuthMiddleWare       = require("../middlewares/AuthMiddleware"),
      GeneralMiddleware    = require("../middlewares/GeneralMiddleware"),
      RequestApiMiddleware = require("../middlewares/RequestApiMiddleware")

const AuthController     = require("../controllers/AuthController"),
      FriendController   = require("../controllers/FriendController"),
      FirebaseController = require("../controllers/FirebaseController")

/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = app => {

    app.use([ GeneralMiddleware.formatJsonApi ])


    router.post("/register", [ RequestApiMiddleware.REGISTER ], AuthController.register )
    router.post("/login", [ RequestApiMiddleware.LOGIN ], AuthController.login )
    router.post("/refreshs", [ RequestApiMiddleware.REFRESH ], AuthController.refreshs )
    
    router.get('/firebase/notification', FirebaseController.firebaseNotification )

    // Sử dụng authMiddleware.isAuth trước những api cần xác thực
    router.use( AuthMiddleWare.isAuth )
    // List Protect APIs:
    router.get("/friends", FriendController.friendLists )

    return app.use( "/api/v1/", router )
}
module.exports = initAPIs