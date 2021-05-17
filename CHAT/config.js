'use strict'
require('dotenv').config()

var local      = process.env.ASSET_REALTIME,
    local_ip   = process.env.ASSET_REALTIME_IP,
    local_port = process.env.ASSET_REALTIME_PORT,
    peer_port  = 7000

var CONFIG = {
    SERVER : {
        PORT     : local_port,
        DOMAIN   : local,
        IP       : local_ip,
        PEER_PORT: peer_port,
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
    mailler: {
        email: "jbtruongthanhhung@gmail.com",
        password: "...."
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
    ID_ADMIN : 1,
    ASSET_PHP_URL: process.env.ASSET_PHP_URL,
    CORS_API:  process.env.APP_ENV == 'local' ? '*' : process.env.ASSET_PHP_URL,
    CORS_IO:  process.env.APP_ENV == 'local' ? '*:*' : process.env.ASSET_PHP_URL + ":*",
    WEBPUSH: { 
        PUBLIC_KEY: 'BIUnprvdEEntYAgrOBaI_MAaWK8qtRtgfM_RKnSGglsI1NAZUcycI7yJ6YL2ZEoqmKG9dSQ3AtX0-2mS6j_7epE',
        PRIVATE_KEY: 'OAGhOjAuZ5WqNOm7hdqNeo-SSJqGApaXivfY5ps0Eiw'
    },
    EVENT : {
        CONNECTTION                 : 'connection',
        DISCONNECT                  : 'disconnect',
        SEND_MESSAGE                : 'send-message',
        RESPONSE_MESSAGE            : 'response-message',
        RESPONSE_MESSAGE_ERROR      : 'response-message-error',
        JOIN_CHANNEL                : "join-channel",
        SEND_TYPING                 : "send-typing",
        RESPONSE_TYPING             : 'response-typing',
        USER_ONLINE                 : "USER_ONLINE",
        USER_ONLINE_NOTI            : "USER_ONLINE_NOTI",
        USER_OFFLINE_NOTI           : "USER_OFFLINE_NOTI",
        DUPLICATION_TAB             : "DUPLICATION_TAB",
        READ_MESSAGE_ALL            : "READ_MESSAGE_ALL",
        READ_MESSAGE_ALL_RESPONSE   : "READ_MESSAGE_ALL_RESPONSE",
        USER_GET_BOOKING            : "USER_GET_BOOKING",
        RESPONSE_USER_GET_BOOKING   : "RESPONSE_USER_GET_BOOKING",
        USER_CHANGE_BOOKING         : "USER_CHANGE_BOOKING",
        RESPONSE_USER_CHANGE_BOOKING: "RESPONSE_USER_CHANGE_BOOKING",
        RESPONSE_USER_CHANGE_BOOKING_ERROR: "RESPONSE_USER_CHANGE_BOOKING_ERROR"
    },
    CHANNEL: {
        SINGLE_PREFIX: "SINGLE",
        SINGLE_ADMIN_PREFIX: "ADMIN",
        ROLE_USER: {
            sitter  : 2,
            employer: 3,
            admin   : 1
        }
    },
    SCHEDULE_STATUS: {
        DEFAULT: 0,
        PICKED: 1
    },
    BOOKING_CASE: {
        SITTER_ACCEPT  : "SITTER_ACCEPT",
        EMPLOYER_ACCEPT: "EMPLOYER_ACCEPT",
        PAYMENT        : "PAYMENT",
    },
    BOOKING_STATUS: {
        DEFAULT: 0,
        PICKED: 1
    },
    ORDER_STATUS: {
        DEFAULT: 0,
        ERROR: 1
    },
    BOOKING_CRON_FILTER: {
        DEFAULT: 0
    },
    MAX_LENGTH_MESSAGE: 10000,
    GENDER: {
        FEMALE: 1, /// nữ
        MALE: 2, /// nam
    },
    SIZES: {
        icon: [ 100, 200 ],
        avatar: [ 200, 200 ],
    },
    IMAGE_TYPE: {
        fill: 'fill',
        fit: 'fit'
    }
}
module.exports = CONFIG;