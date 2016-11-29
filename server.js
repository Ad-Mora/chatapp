// basic setup
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static('public'));
server.listen(process.env.port || 8000);

// index.html is the homepage
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function(socket) {

    // send message
    socket.on('send message', function(data) {
        io.sockets.emit('new message', {msg: data, user: socket.username});
    });

    // new user connects
    socket.on('new user', function(data, callback) {
        callback(true);
        socket.username = data;
    });
});


