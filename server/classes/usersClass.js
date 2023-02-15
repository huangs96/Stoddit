class LiveUserContainer {
  constructor() {
    this.users = {};
  }

  addUser(userID, socketID) {
    if (users[userID] !== userID) {
      this.users[userID] = socketID;
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