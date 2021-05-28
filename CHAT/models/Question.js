const CONFIG = require('../config'),
      i18n   = require("i18n")

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema

const QuestionSchema = new Schema(
    {
        name: {
            type: String,
            required: true, //[true, i18n.__('mongo.name_required')],
            minlength: 2, /// [5, i18n.__('mongo.name_min_length')],
            maxlength: 1000
        },
        image: {
            type: String,
            maxlength: 3000
        },
        iden: {
            type: String,
            maxlength: 3000
        },
        delete: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
    }
)



/**
 * @swagger
 * components:
 *     schemas:
 *         QuestionResources:
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
 *                  image: 
 *                      type: string
 *                      description: hình ảnh 
 *                      example: /10894/10894.jpg
 *                  iden:
 *                      type: string
 *                      description: id của bên bị ăn cắp
 *                      example: 10894
 *                  createdAt: 
 *                      type: string
 *                      description: 
 *                      example: "2021-01-20T08:59:16.468Z"
 *                  updatedAt: 
 *                      type: string
 *                      description: 
 *                      example: "2021-01-20T08:59:16.468Z"
 */
QuestionSchema.methods.toResources = function() {
    
    return {
        _id      : this._id,
        name     : this.name,
        image    : this.image,
        iden     : this.iden,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

module.exports = mongoose.model("question", QuestionSchema)