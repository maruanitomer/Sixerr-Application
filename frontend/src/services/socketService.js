import io from 'socket.io-client'
import { httpService } from './httpService'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
// export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// window.socketService = socketService


// function createSocketService() {
var socket

async function setup() {
  await httpService.get('/api/setupSession')
  socket = io(baseUrl)
}
async function on(eventName, cb) {
  await httpService.get('/api/setupSession')
  socket.on(eventName, cb)
}
function off(eventName, cb) {
  socket.off(eventName, cb)
}
function emit(eventName, data) {
  socket.emit(eventName, data)
}
function terminate() {
  socket = null
}


// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    },
    debugMsg() {
      this.emit('chat addMsg', { from: 'Someone', txt: 'Aha it worked!' })
    },
  }
  return socketService
}

export const socketService = {
  setup,
  on,
  off,
  terminate,
  emit,
}
// Basic Tests
// function cb(x) {console.log(x)}
// socketService.on('baba', cb)
// socketService.emit('baba', 'DATA')
// socketService.off('baba', cb)
