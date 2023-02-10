class LiveUserContainer {
  constructor() {
    this.users = {};
  }

  addUser(userID, socketID) {
    this.users[userID] = socketID;
  }

  removeUser(userID, socketID) {
    
  }
}