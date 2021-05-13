const CONFIG = require('../config.js')

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

const MessageSchema = new Schema(
    {
        channel : {
            type: Schema.Types.ObjectId,
            ref : 'channel'
        },
        user: { 
            type   : String,
        },
        body: {
            type: String,
            maxlength: CONFIG.MAX_LENGTH_MESSAGE
        },
        read: {
            type: Boolean,
            default: false
        },
        readAdmin: {
            type: Boolean,
            default: false
        },
        style : {
            type: String
        },
        booking : [
            { 
                id: String, 
                date: String, 
                start: String, 
                finish: String,
                edit: {
                    type: Boolean,
                    default: false
                },
                sitter_accept: {
                    type: Boolean,
                    default: false
                }, 
                employer_accept: {
                    type: Boolean,
                    default: false
                },
                status: {
                    type: Boolean,
                    default: false
                },
                order: {
                    type: Number,
                    default: 0
                }
            }
        ],
        attachment: [
            { type: Object }
        ],
        backup: {
            type   : Boolean,
            default: false /// message của user
        },
    }, {
        timestamps: true
    }
)


module.exports = mongoose.model("message", MessageSchema)


