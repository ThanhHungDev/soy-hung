const CONFIG = require('../config'),
      i18n   = require("i18n")

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true, //[true, i18n.__('mongo.name_required')],
            minlength: 2, /// [5, i18n.__('mongo.name_min_length')],
            maxlength: 100
        },
        email: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024
        },
        phone: {
            type: Number,
            minlength: 8,
            maxlength: 20,
        },
        gender: {
            type: Number,
            min: 1,
            max: 2,
        }

    }, {
        timestamps: true
    }
)
UserSchema.index({ email: 1}) //Nơi đánh index



/**
 * @swagger
 * components:
 *     schemas:
 *         UserResources:
 *             type: object
 *             properties:
 *                  _id:
 *                     type: string
 *                     description: là id trong mongo. thực tế sẽ là mongoose.Types.ObjectId(id). 
 *                     example: 5f991cda17e4b67ffd192041
 *                  name:
 *                     type: string
 *                     description: tên ngừoi dùng
 *                     example: trương thanh hùng
 *                  email: 
 *                      type: string
 *                      description: email login
 *                      example: thanhhung.tud@gmail.com
 *                  phone:
 *                      type: string
 *                      description: số điện thoại liên hệ
 *                      example: 080 3387 0674
 *                  gender:
 *                      type: int
 *                      description: giới tính, nếu là 1 thì là nữ 2 là nam
 *                      example: 2
 *                  createdAt: 
 *                      type: string
 *                      description: 
 *                      example: "2021-01-20T08:59:16.468Z"
 *                  updatedAt: 
 *                      type: string
 *                      description: 
 *                      example: "2021-01-20T08:59:16.468Z"
 */
UserSchema.methods.toResources = function() {
    
    return {
        _id      : this._id,
        name     : this.name,
        email    : this.email,
        phone    : this.phone,
        gender   : this.gender,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

module.exports = mongoose.model("user", UserSchema)


