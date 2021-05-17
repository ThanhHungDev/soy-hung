const fs     = require('fs'),
      path   = require('path'),
      multer = require('multer')
const CONFIG = require('../config')


let generateUrlImageResize = (url, size, type ) => {
    
    if(!url){
        return
    }
    if(url.indexOf("http://") + 1){
        /// url có http
        return
    }
    if( !size || !type ){
        return
    }
    /// check size and type 
    if( type != CONFIG.IMAGE_TYPE.fill && type != CONFIG.IMAGE_TYPE.fit ){
        return
    }

    if( typeof CONFIG.SIZES[size] != 'object' ){
        return
    }
    url = url.split(path.sep).filter(Boolean).join(path.sep)

    return '/resizes/' + size + '/' + type + '/' + url 
}

module.exports = {
    generateUrlImageResize,
}
