class LiveUserContainer {
  constructor() {
    this.users = new Map();
  }

  addUser(socketID, userID) {
    if (!this.users.has(socketID)) {
      this.users.set(socketID, userID);
    } else {
      console.log('exists');
    }
  };

  removeUser(socketID) {
    this.users.delete(socketID);
  };

  getUser(socketID) {
    this.users.get(socketID);
  };
};

module.exports = LiveUserContainer;