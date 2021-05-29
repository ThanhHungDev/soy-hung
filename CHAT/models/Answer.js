const CONFIG = require('../config'),
      i18n   = require("i18n")

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema

const AnswerSchema = new Schema(
    {
        question : {
            type: Schema.Types.ObjectId,
            ref : 'question'
        },
        name: {
            type: String,
            maxlength: 1000
        },
        question_id: {
            type: String,
            maxlength: 3000
        },
        backup: {
            type: String,
            maxlength: 500000
        },
        image: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        },
        type: {
            type: String,
            maxlength: 3000
        },
        unisex: {
            type: String,
            maxlength: 3000
        },
        result_unisex: [
            {
                width: {
                    type: Number
                },
                height: {
                    type: Number
                },
                image: {
                    type: String,
                    maxlength: 3000
                },
                overlays: [
                    {
                        type: {
                            type: String,
                            maxlength: 3000
                        },
                        text: [
                            {
                                type: String,
                                maxlength: 3000
                            },
                        ],
                        color: {
                            type: String,
                            maxlength: 3000
                        },
                        vertical_align: {
                            type: String,
                            maxlength: 3000
                        },
                        text_align: {
                            type: String,
                            maxlength: 3000
                        },
                        font: {
                            type: String,
                            maxlength: 3000
                        },
                        font_size: {
                            type: Number
                        },
                        vertical_axis: {
                            type: Number
                        },
                        horizontal_axis: {
                            type: Number
                        },
                        width: {
                            type: Number
                        },
                        height: {
                            type: Number
                        },
                        // "j": false,
                        // "si": false,
                        // "sb": true,
                        // "uc": true,
                        // "a": 0,
                        // "hl": 0
                    }
                ]
            }
        ],
        result_female: [
            {
                width: {
                    type: Number
                },
                height: {
                    type: Number
                },
                image: {
                    type: String,
                    maxlength: 3000
                },
                overlays: [
                    {
                        type: {
                            type: String,
                            maxlength: 3000
                        },
                        text: [
                            {
                                type: String,
                                maxlength: 3000
                            },
                        ],
                        color: {
                            type: String,
                            maxlength: 3000
                        },
                        vertical_align: {
                            type: String,
                            maxlength: 3000
                        },
                        text_align: {
                            type: String,
                            maxlength: 3000
                        },
                        font: {
                            type: String,
                            maxlength: 3000
                        },
                        font_size: {
                            type: Number
                        },
                        vertical_axis: {
                            type: Number
                        },
                        horizontal_axis: {
                            type: Number
                        },
                        width: {
                            type: Number
                        },
                        height: {
                            type: Number
                        },
                        // "j": false,
                        // "si": false,
                        // "sb": true,
                        // "uc": true,
                        // "a": 0,
                        // "hl": 0
                    }
                ]
            }
        ],
        result_male: [
            {
                width: {
                    type: Number
                },
                height: {
                    type: Number
                },
                image: {
                    type: String,
                    maxlength: 3000
                },
                overlays: [
                    {
                        type: {
                            type: String,
                            maxlength: 3000
                        },
                        text: [
                            {
                                type: String,
                                maxlength: 3000
                            },
                        ],
                        color: {
                            type: String,
                            maxlength: 3000
                        },
                        vertical_align: {
                            type: String,
                            maxlength: 3000
                        },
                        text_align: {
                            type: String,
                            maxlength: 3000
                        },
                        font: {
                            type: String,
                            maxlength: 3000
                        },
                        font_size: {
                            type: Number
                        },
                        vertical_axis: {
                            type: Number
                        },
                        horizontal_axis: {
                            type: Number
                        },
                        width: {
                            type: Number
                        },
                        height: {
                            type: Number
                        },
                        // "j": false,
                        // "si": false,
                        // "sb": true,
                        // "uc": true,
                        // "a": 0,
                        // "hl": 0
                    }
                ]
            }
        ],
    }, {
        timestamps: true
    }
)



AnswerSchema.methods.toResources = function() {
    
    return {
        _id          : this._id,
        name         : this.name,
        question_id  : this.question_id,
        question     : this.question,
        image        : this.image,
        width        : this.width,
        height       : this.height,
        type         : this.type,
        unisex       : this.unisex,
        result_unisex: this.result_unisex,
        result_female: this.result_female,
        result_male  : this.result_male,
        createdAt    : this.createdAt,
        updatedAt    : this.updatedAt,
    }
}

module.exports = mongoose.model("answer", AnswerSchema)