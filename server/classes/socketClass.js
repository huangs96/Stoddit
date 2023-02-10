const { Server } = require("socket.io");

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


  socketOn() {
    this.io.on(string, socket => {
      console.log('socketOn', socket, string);
    })
  }



}


module.exports = SocketManager;

