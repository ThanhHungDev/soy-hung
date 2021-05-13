const node_validator = require('node-input-validator'),
      { Validator }  = node_validator

const CONFIG    = require("../config")
const { EVENT } = CONFIG


/**
 * Init all sockets on your application
 * @param {*} app from express
 */
let initSocketEvents = (io) => {
    io.sockets.on( EVENT.CONNECTTION ,function(socket){ 

        console.log("have connect: " + socket.id )
        
        socket.on( EVENT.DISCONNECT, async function () {

            console.log( EVENT.DISCONNECT + " set user offline")
            socket.leaveAll()
        })
    })

}
module.exports = initSocketEvents