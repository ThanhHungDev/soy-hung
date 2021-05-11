/**
 * define
*/
var express = require('express'),
    router  = express.Router()
 
var { channels } = require("../controller/channel")

var { VALIDATE_GET_CHANNELS } = require("../middleware/request/VALIDATE_GET_CHANNELS")

 
 
router.get('/channels', [ VALIDATE_GET_CHANNELS ], channels )
 
module.exports = router