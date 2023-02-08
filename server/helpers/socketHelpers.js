const addUser = (users, userID, socketID) => {
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

const removeUser = (users, socketID) => {
  for (let user of users) {
    if (user.socketID !== socketID) {
      const index = users.indexOf(user);
      if (index > -1) {
        users.splice(index, 1);
      } else {
        return;
      };
    };
  };
  return users;
};

const getUser = (users, participants) => {
  const userData = users.find(user => participants.some(participant => participant.account_id === user.userID));

  return userData;
};

module.exports = {
  addUser,
  removeUser,
  getUser
}