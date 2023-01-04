const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

class SocketManager {
  constructor() {
    this.io = null
  };

  start(server) {
    this.io = new Server(server);
  };


}


module.exports = new SocketManager();