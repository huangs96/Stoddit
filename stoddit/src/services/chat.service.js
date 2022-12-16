//get friends list from database
const getFriendsList = async () => {
  return fetch('http://localhost:5000/chat/friends', {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  });
};

//get chatrooms from database
const getChatroomByUserID = async (userID) => {
  return fetch(`http://localhost:5000/chat/chatroom/user/${userID}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  });
};

//get participants from database
const getParticipants = () => {

};

//get messages from database
const getMessages = async (chatroomID) => {
  return fetch(`http://localhost:5000/chat/message/chatroomid=${chatroomID}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  });
}

module.exports = {
  getFriendsList,
  getChatroomByUserID,
  getMessages
}