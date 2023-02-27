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
    };
    throw response;
  });
};

const createNewChatroom = async (data) => {
  return fetch('http://localhost:5000/chat/createchatroom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  });
};

const deleteChatroomByID = async (id) => {
  return fetch(`http://localhost:5000/chat/deletechatroom/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify()
  })
  .then(response => {
    if (response.ok) {
      return response;
    }
    throw response;
  });
};
/* -------------------------------- */


/* ------ Participant ------ */
//get participants from database
const getParticipantIDFromChatroomID = async(chatroomID) => {
  return fetch(`http://localhost:5000/chat/participant/chatroom/${chatroomID}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include'
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw response;
  });
};


const getParticipantIDFromAccountID = async (userID) => {
  return fetch(`http://localhost:5000/chat/participant/user/${userID}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include'
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw response;
  });
};

const getUserParticipantID = async (userID, chatroomID) => {
  return fetch(`http://localhost:5000/chat/participant/user/${userID}/${chatroomID}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include'
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw response;
  });
};

const deleteParticipantFromChatroom = async (participantData) => {
  const res = await fetch('http://localhost:5000/chat/leavechatroom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(participantData)
  })
  .then(res => res.json());
  return res;
};
/* -------------------------------- */


/* ------ Message ------ */
//get messages from database
const getMessagesByChatroomID = async (chatroomID) => {
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
    body: JSON.stringify(messageData)
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

const getFriendsListById = async (id) => {
  return fetch(`http://localhost:5000/chat/friends/${id}`, {
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

const getUserIDByUsername = async (username) => {
  return fetch(`http://localhost:5000/chat/friends/user/${username}`, {
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

const addFriend = async (addUserData) => {
  const res = await fetch('http://localhost:5000/chat/friends/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',    
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(addUserData)
  })
  .then(res => res.json());
  console.log(res);
  return res;
};

const deleteFriend = async (deleteUserData) => {
  const res = await fetch('http://localhost:5000/chat/friends/delete', {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(deleteUserData)
  })
  .then(res => res.json());
  console.log(res);
  return res;
};
/* -------------------------------- */

module.exports = {
  //chatroom
  getChatroomByUserID,
  createNewChatroom,
  deleteChatroomByID,
  //participant
  getParticipantIDFromChatroomID,
  getParticipantIDFromAccountID,
  getUserParticipantID,
  deleteParticipantFromChatroom,
  //message
  getMessagesByChatroomID,
  sendMessage,
  //friend_list
  getFriendsList,
  getFriendsListById,
  getUserIDByUsername,
  addFriend,
  deleteFriend
}