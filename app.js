const path = require('path');
const express = require('express');
const app = express();
var server = require('http').createServer(app);

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket)=>{
    console.log('nueva conexion', socket.id);

    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:message', data);
    });
    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    });
});