class LiveUserContainer {
  constructor() {
    this.users = new Map();
  }

  addUser(socketID, userID) {
    if (this.users.size > 0) {
      const userIDs = [...this.users.values()];
      if (!userIDs.includes(userID)) {
        this.users.set(socketID, userID);
      };
    } else {
      this.users.set(socketID, userID);
    };
  };

  removeUser(socketID) {
    this.users.delete(socketID);
    console.log('users', this.users);
  };

  getUser(socketID) {
    this.users.get(socketID);
  };
};

module.exports = LiveUserContainer;