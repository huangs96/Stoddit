const { Server } = require("socket.io");

class Socket {
  constructor(socket) {
    this.socket = socket;
  }

  onLiveUsers(cb) {
    this.socket.on('liveUsers', (userID) => {
      socketHelper.addUser(users, userID, socket.id);
      io.emit('getUsers', users);
      // io.emit('getUserMessage', `${userID} has joined!`);
    });
  }
}



class SocketManager {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
    });
  };


  onConnection(cb) {
    this.io.on('connection', (socket) => {
      cb(new Socket(socket))
    })
  }



}


module.exports = SocketManager;

