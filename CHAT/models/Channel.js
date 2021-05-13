const CONFIG = require('../config.js');


var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

const ChannelSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Channel Name is required']
        },
        user: [
            {
                type: String
            }
        ],
        backup: {
            type: Boolean,
            default: false /// channel xóa thì không xóa hẳn, thông thường là cột delete
        },
        sort: {
            type: Number,
            default: 1
        }
    }, {
    timestamps: true
})


ChannelSchema.methods.changeToOneUser = function( _user ) {
    let users = this.user
    let otherUser = users.find( id => parseInt(id) != parseInt(_user) )
    return {
        id    : this._id,
        name  : this.name,
        user  : otherUser,
        backup: this.backup,
        sort  : this.sort,
    }
};

module.exports = mongoose.model("channel", ChannelSchema)