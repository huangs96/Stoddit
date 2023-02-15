class LiveUserContainer {
  constructor() {
    this.users = new Map();
  }

  addUser(socketID, userID) {
    this.users.set(socketID, userID);
  }

  removeUser(socketID) {
    this.users.delete(socketID);
  };

  getUser(socketID) {
    this.users.get(socketID);
  };
};

module.exports = LiveUserContainer;