class LiveUserContainer {
  constructor() {
    this.users = new Map();
  }

  addUser(userID, socketID) {
    this.users.set(userID, socketID);
  }

  removeUser(userID) {
    this.users.delete(userID);
  }

  getUser(userID) {
    this.users.get(userID);
  }
};

module.exports = LiveUserContainer;