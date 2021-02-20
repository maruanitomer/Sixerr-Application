

const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null
var gSocketBySessionIdMap = {}

function emit({ type, data }) {
    gIo.emit(type, data);
}


function connectSockets(http, session) {
    gIo = require("socket.io")(http, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
    const sharedSession = require('express-socket.io-session');
    gIo.use(sharedSession(session, {
        autoSave: true
    }));
    gIo.on('connection', socket => {
        console.log('sessionId in conection',socket.handshake.sessionID)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        socket.on('disconnect', socket => {
            console.log('Someone disconnected', socket.myTopic)
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })
        socket.on('chat topic', topic => {
            console.log('topic', topic)
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic
        })
        socket.on('chat newMsg', msg => {
            console.log('msg', msg)
            gIo.to(msg.to).emit('chat addMsg', msg)
        })
        socket.on('new order', msg => {
            console.log('msg', msg)
            gIo.to(msg.gig.owner._id).emit('order received', msg)
        })

    })
}

// Send to all sockets BUT not the current socket 
function broadcast({ type, data }) {
    const store = asyncLocalStorage.getStore()
    const { sessionId } = store
    if (!sessionId) return logger.debug('Shoudnt happen, no sessionId in asyncLocalStorage store')
    const excludedSocket = gSocketBySessionIdMap[sessionId]
    if (!excludedSocket) return logger.debug('Shouldnt happen, No socket in map', gSocketBySessionIdMap)
    excludedSocket.broadcast.emit(type, data)
}
function join(userId) {
    const store = asyncLocalStorage.getStore()
    const { sessionId } = store
    console.log('sessionId in JOIN', sessionId)
    if (!sessionId) return logger.debug('Shoudnt happen, no sessionId in asyncLocalStorage store')
    const socket = gSocketBySessionIdMap[sessionId]
    if (!socket) return logger.debug('Shouldnt happen, No socket in map', gSocketBySessionIdMap)
    socket.join(userId)
}

module.exports = {
    connectSockets,
    emit,
    broadcast,
    join
}



