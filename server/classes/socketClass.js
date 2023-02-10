const { Server } = require("socket.io");

class SocketManager {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
    })
  };

  start(server) {
    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
    });
  };

  socketOn() {
    this.io.on(string, (socket) => {
      socket.on(string, data);
    })
  }



}


module.exports = new SocketManager();

