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
    console.log('socketID in remove', socketID);
    for (let liveUsers in this.users) {
      console.log('loopedliveusers', liveUsers);
      if (this.users[liveUsers] === socketID) {
        delete this.users[liveUsers];
      };
    };
  };

  getUser(userID) {
    this.users.get(userID);
  };
};

module.exports = LiveUserContainer;