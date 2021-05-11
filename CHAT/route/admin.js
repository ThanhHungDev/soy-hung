/**
 * define
 */
var express               = require('express')
var router                = express.Router()


var { informationChannels, 
    adminToggleChannel, 
    adminUpdateChannel,
    readMessageChat,
    adminReadingChannel,
    adminGetUnreadMessage }    = require("../controller/channel")

router.get('/information-channels', informationChannels )
router.get('/read-message', readMessageChat )
router.put('/toggle-channel', adminToggleChannel )
router.get('/update-channel', adminUpdateChannel )
router.put('/reading', adminReadingChannel )
router.get('/unread', adminGetUnreadMessage )


module.exports = router