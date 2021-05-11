var io,
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
CONFIG       = require("../config"),
Message      = require("../model/Message"),
Channel      = require("../model/Channel"),
EVENT        = CONFIG.EVENT

const node_validator = require('node-input-validator')
var   { Validator }  = node_validator

// var Op       = Postgre.Sequelize.Op;
module.exports = function(_io) {
    io = _io
    socketConnecting()
};

function socketConnecting(){

    io.sockets.on( EVENT.CONNECTTION ,function(socket){ 

        console.log("have connect: " + socket.id + " " + CONFIG.EVENT.REQUEST_GET_CHANEL);
    })
}

function disconnect(socket){
    socket.on( EVENT.DISCONNECT, async function () {

        console.log( EVENT.DISCONNECT + " set user offline")
        socket.leaveAll()
    })
}

