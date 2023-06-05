import {Server} from 'socket.io'

const io =new Server();
//チャット機能
io.on('connection', (socket) => {
    socket.join("roomA");
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});

export default io;