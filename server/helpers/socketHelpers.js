let users = [];

const addUser = (userID, socketID) => {
  if (users.length > 0) {
    if (users.some(user => user.userID === userID)) {
      console.log('exists---');
      return;
    } else {
      users.push({userID, socketID});
    }
  } else {
    users.push({userID, socketID});
  };
};

const removeUser = (socketID) => {
  users = users.filter((user) => user.socketID !== socketID);
};

const getUser = (participants) => {
  // console.log('participants---', participants);
  const userData = users.find(user => participants.some(participant => participant.account_id === user.userID));

  return userData;
};

module.exports = {
  users,
  addUser,
  removeUser,
  getUser
}