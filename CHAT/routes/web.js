/**
 * define
*/
const express = require("express")
const router  = express.Router()

const ImageController    = require("../controllers/ImageController")
/**
 * Init all WEBs on your application
 * @param {*} app from express
 */
let initWEBs = (app) => {
    
    /*
    |--------------------------------------------------------------------------
    | Web Routes
    |--------------------------------------------------------------------------
    |
    | Here is route image
    |
    */
    router.get( "/resizes/:size/:type/:imagePath([a-zA-Z0-9]*)", ImageController.resize)


    router.get('/channels', (req, res ) => {
        let user = {
            name: "hung tt"
        }
        return res.render('index', { user });
    })

    return app.use("/", router);
}
module.exports = initWEBs;