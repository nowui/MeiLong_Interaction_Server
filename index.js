// Setup basic express server
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var port = process.env.PORT || 3000

server.listen(port, function () {
  console.log('Server listening at port %d', port)
})

// Routing
app.use(express.static(__dirname + '/public'))

// Chatroom

var numUsers = 0

io.on('connection', function (socket) {
  var isLogin = false

  socket.on('login', function (user) {
    if (isLogin) {
      return
    }

    console.log('login:' + user)

    socket.user = user

    isLogin = true
  })

  socket.on('push', function (data) {
    console.log('push:{user:' + socket.user + ', data:' + data + '}')

    socket.broadcast.emit('push', {
      user: socket.user,
      data: data
    })
  })

  socket.on('back', function (data) {
    console.log('back:{user:' + socket.user + ', data:' + data + '}')

    socket.broadcast.emit('back', {
      user: socket.user,
      data: data
    })
  })

  socket.on('open', function (data) {
    console.log('open:{user:' + socket.user + ', data:' + data + '}')

    socket.broadcast.emit('open', {
      user: socket.user,
      data: data
    })
  })

  socket.on('up', function (data) {
    console.log('up:{user:' + socket.user + ', data:' + data + '}')

    socket.broadcast.emit('up', {
      user: socket.user,
      data: data
    })
  })

  socket.on('down', function (data) {
    console.log('down:{user:' + socket.user + ', data:' + data + '}')

    socket.broadcast.emit('down', {
      user: socket.user,
      data: data
    })
  })

  socket.on('disconnect', function () {

  })
})
