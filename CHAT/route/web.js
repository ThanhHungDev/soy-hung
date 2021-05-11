/**
 * define
*/
var express = require('express'),
    router  = express.Router()
 
var { channels } = require("../controller/channel")
 
 
router.get('/channels', (req, res ) => {
    let user = {
        name: "hung tt"
    }
    return res.render('index', { user });
})
 
module.exports = router