'use strict'
require('dotenv').config()

var local      = process.env.ASSET_REALTIME,
    local_ip   = process.env.ASSET_REALTIME_IP,
    local_port = process.env.ASSET_REALTIME_PORT

var CONFIG = {
    SERVER : {
        PORT     : local_port,
        DOMAIN   : local,
        IP       : local_ip,
        PROTOCOL: function(){
            if( local_port == 443 ){
                return "https://"
            }
            return  "http://"
        }, 
        ASSET : () => {
            let port_url = ''
            let protocol = ''
            if( local_port == 443 ){
                protocol = "https://"
            }else{
                protocol = "http://"
                port_url = ':'+ local_port
            }

            return protocol + local + port_url;
        }
    },
    database : {
        
        postgre : {
            type         : process.env.DB_TYPE,
            username     : process.env.DB_USER,
            password     : process.env.DB_PASS,
            database_name: process.env.DB_NAME,
            host         : process.env.DB_HOST,
            dialect      : 'postgres',
            logging      : false
        },
        mongodb : process.env.DB_MONGO,
    },
    TimeExpireAccessToken : 20 * 60 * 60,
    salt : 5,
    IS_ENVIROMENT_PRODUCT : true,
    CORS_API:  process.env.APP_ENV == 'local' ? '*' : process.env.ASSET_PHP_URL,
    CORS_IO:  process.env.APP_ENV == 'local' ? '*:*' : process.env.ASSET_PHP_URL + ":*",
    
    EVENT : {
        CONNECTTION                 : 'connection',
        DISCONNECT                  : 'disconnect',
    },
    SIZES: {
        icon: [ 100, 200 ],
        avatar: [ 200, 200 ],
    },
    IMAGE_TYPE: {
        fill: 'fill',
        fit: 'fit'
    },
    API: {
        domain_ahaquiz: 'https://img.ahaquiz.me',
        ahaquiz: 'https://img.ahaquiz.me/1_@a2pi_1/vi/home1.json',
        ahaquiz_answer : "https://img.ahaquiz.me/1_@a2pi_1/vi/data"
    }
}
module.exports = CONFIG;