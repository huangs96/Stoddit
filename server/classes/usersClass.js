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
    // this.users.delete(socketID);
    // console.log('users', this.users);
  };

  getUser(socketID) {
    this.users.get(socketID);
  };
};

module.exports = LiveUserContainer;