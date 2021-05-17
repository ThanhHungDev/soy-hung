const CONFIG = require('../config'),
      i18n   = require("i18n")

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema

const NotificationSchema = new Schema(
    {
        token: {
            type: String,
            required: true, //[true, i18n.__('mongo.name_required')],
            minlength: 2, /// [5, i18n.__('mongo.name_min_length')],
            maxlength: 3000
        },
        device: {
            type: String,
            required: true,
            enum: ['android', 'ios', 'web']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref : 'user'
        },
        access : {
            type: String,
            required: true, //[true, i18n.__('mongo.name_required')],
            minlength: 2, /// [5, i18n.__('mongo.name_min_length')],
            maxlength: 3000,
            unique: true
        },
    }, {
        timestamps: true
    }
)

/**
 * @swagger
 * components:
 *     schemas:
 *         NotificationResources:
 *             type: object
 *             properties:
 *                  _id:
 *                     type: string
 *                     description: là id trong mongo. thực tế sẽ là mongoose.Types.ObjectId(id). 
 *                     example: 5f991cda17e4b67ffd192041
 *                  token:
 *                     type: string
 *                     description: token firebase
 *                     example: dCMmD7vzQICqZ-syV1W4JJ:APA91bHa0DGJFg6jA_2SwyCmIUM7JlDbc1ogZMWayQ7FkV_iId2-U063-bWgzHPsbeZITzNsDNhJbx1DdUc7d-F8zi6NXbGrb8DfgQ804lnIsqiYi8FH2ia6gCiApiwiEUHZq6KyPLTF
 *                  device: 
 *                      type: string
 *                      description: android, ios, web
 *                      example: android
 *                  user:
 *                      type: string
 *                      description: mongoid của user trong bảng user
 *                      example: 609dd241e728c00f527fb4d5
 *                  access:
 *                     type: string
 *                     description: token jwt
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlkZDI0MWU3MjhjMDBmNTI3ZmI0ZDUiLCJuYW1lIjoidGVzdCB0aOG7rSIsImVtYWlsIjoidGhhbmhodW5nLmNvZGVAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0xNFQwMToyODozMy4yMjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0xNFQwMToyODozMy4yMjJaIiwiYXV0aG9yaXphdGlvbiI6InVzZXIiLCJpYXQiOjE2MjA5NjEzMjcsImV4cCI6MTYyMDk2NDkyN30.BmGsxMue-ey1rBqQLHqkLm2e7DxLYDVvtvMgnolhs6o
 *                  createdAt: 
 *                      type: string
 *                      description: 
 *                      example: "2021-01-20T08:59:16.468Z"
 *                  updatedAt: 
 *                      type: string
 *                      description: 
 *                      example: "2021-01-20T08:59:16.468Z"
 */
 NotificationSchema.methods.toResources = function() {
    
    return {
        _id      : this._id,
        token    : this.token,
        device   : this.device,
        user     : this.user,
        access   : this.access,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

module.exports = mongoose.model("notification", NotificationSchema)


