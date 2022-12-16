/* ------ Chatroom ------ */
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
/* -------------------------------- */


/* ------ Participant ------ */
//get participants from database
const getParticipants = () => {
  
};
/* -------------------------------- */


/* ------ Message ------ */

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
};

//insert message into database
const sendMessage = async (messageData) => {
  const res = await fetch('http://localhost:5000/chat/message/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',    
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify()
  })
  .then(res => res.json());
  return res;
};
/* -------------------------------- */


/* ------ Friend_list ------ */
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
/* -------------------------------- */

module.exports = {
  //chatroom
  getChatroomByUserID,
  //participant
  //message
  getMessages,
  sendMessage,
  //friend_list
  getFriendsList,
}