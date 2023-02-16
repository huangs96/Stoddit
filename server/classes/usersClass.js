class LiveUserContainer {
  constructor() {
    this.users = new Map();
  }

  addUser(socketID, userID) {
    if (this.users.size > 0) {
      const userIDs = [...this.users.values()];
      if (!userIDs.includes(userID)) {
        console.log('it got here111');
        this.users.set(socketID, userID);
      };
    } else {
      console.log('it got here');
      this.users.set(socketID, userID);
    };
  };

  removeUser(socketID) {
    this.users.delete(socketID);
  };

  getUser(socketID) {
    this.users.get(socketID);
  };
};

module.exports = LiveUserContainer;