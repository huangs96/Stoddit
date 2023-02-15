class LiveUserContainer {
  constructor() {
    this.users = new Map();
  }

  addUser(userID, socketID) {
    this.users.set(userID, socketID);
  }

  getUserIDByValue(users, socketID) {
    for (let [key, value] of users.entries()) {
      if (value === socketID) {
        return key;
      };
    };
  };

  removeUser(userID) {
    this.users.delete(userID);
  };

  getUser(userID) {
    this.users.get(userID);
  };
};

module.exports = LiveUserContainer;