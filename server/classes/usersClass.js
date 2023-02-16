class LiveUserContainer {
  constructor() {
    this.users = {};
  }

  addUser(userID, socketID) {
    if (Object.keys(this.users).length > 0 && !Object.keys(this.users).includes(userID)) {
      this.users[userID] = socketID;
    } else {
      console.log('it got here222')
      this.users[userID] = socketID;
    };
  };

  removeUser(socketID) {
    if (Object.values(this.users).includes(socketID)) {
      console.log('true');
      const userKey = Object.keys(this.users).find(key => this.users[key] = socketID);
      delete this.users[userKey];
    };
  };

  getUser(socketID) {
    this.users.get(socketID);
  };
};

module.exports = LiveUserContainer;