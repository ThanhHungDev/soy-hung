const CONFIG = require('../config'),
      i18n   = require("i18n")

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema,
      { createCanvas, loadImage } = require('canvas')

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




AnswerSchema.methods.createAssetResource = function() {
    
    
}

AnswerSchema.methods.toResources = async function() {

    let { unisex, result_unisex, result_female, result_male } = this

    // if( parseInt(unisex) ){
    //     /// lấy kết quả result_unisex
    //     result_unisex = result_unisex.map( async uni => {

    //         uni.overlays = await uni.overlays.map( async o => { 

    //             // using await
    //             const options = {
    //                 maxWidth: o.width,
    //                 maxHeight: o.height,
    //                 fontSize: o.font_size,
    //                 fontFamily: o.font,
    //                 // lineHeight: 30,
    //                 // margin: 5,
    //                 // bgColor: "blue",
    //                 textColor: o.color,
    //                 verticalAlign: o.vertical_align,
    //                 textAlign: o.text_align
    //             }
    //             o.img = await textToImage.generate(o.text, options)
    //         })
    //         return uni
    //     })
        
    // }
    // const canvas = createCanvas(200, 200)
    // const ctx = canvas.getContext('2d')

    // // Write "Awesome!"
    // ctx.font = '30px Impact'
    // ctx.rotate(0.1)
    // ctx.fillText('Awesome!', 50, 100)

    // // Draw line under text
    // var text = ctx.measureText('Awesome!')
    // ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    // ctx.beginPath()
    // ctx.lineTo(50, 102)
    // ctx.lineTo(50 + text.width, 102)
    // ctx.stroke()
    
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
        base64       : canvas.toDataURL(),
        createdAt    : this.createdAt,
        updatedAt    : this.updatedAt,
    }
}

module.exports = mongoose.model("answer", AnswerSchema)