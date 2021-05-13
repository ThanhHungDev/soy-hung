/**
 * define
*/
const express = require("express")
const router  = express.Router()

/**
 * Init all WEBs on your application
 * @param {*} app from express
 */
let initWEBs = (app) => {
    
    router.get('/channels', (req, res ) => {
        let user = {
            name: "hung tt"
        }
        return res.render('index', { user });
    })

    return app.use("/", router);
}
module.exports = initWEBs;