const { Server } = require("socket.io");

class SocketManager {
  constructor() {
    this.io = null;
  };

  start(server) {
    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
    });
    return this.io;
  };

  socketOn() {
    this.io.on(string, (socket) => {
      socket.on(string, data);
    })
  }



}


module.exports = new SocketManager();

