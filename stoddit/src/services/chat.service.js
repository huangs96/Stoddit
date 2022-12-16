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

//get cchatrooms from database
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
  // const chatrooms = [
  //   {
  //     name: 'Stephen Huang',
  //     title: 'Stephen Huang',
  //     description: 'n/a',
  //     chatroom_id: 3,
  //     img: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png'
  //   },
  //   {
  //     name: 'test1',
  //     title: 'test1',
  //     description: 'test2',
  //     chatroom_id: 4,
  //     img: 'https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg'
  //   },
  // ];
  // return chatrooms;
};

//get participants from database
const getParticipants = () => {

};

//get messages from database
const getMessages = () => {
  const messages = [
    {
      id: 48,
      text: 'hey',
      sent_datetime: new Date(2022, 0, 12, 2, 3, 4),
      chatroom_id: 3,
      img: 'https://i.ibb.co/yNbJ9N4/IMG-9300.jpg'
    },
    {
      id: 48,
      text: 'wassuh',
      sent_datetime: new Date(2022, 0, 12, 3, 1, 4),
      chatroom_id: 3,
      img: 'https://i.ibb.co/yNbJ9N4/IMG-9300.jpg'
    },
    {
      id: 49,
      text: 'hows it goin',
      sent_datetime: new Date(2022, 0, 12, 6, 8, 4),
      chatroom_id: 3,
      img: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png'
    },
    {
      id: 49,
      text: 'hi',
      sent_datetime: new Date(2022, 0, 12, 6, 8, 4),
      chatroom_id: 4,
      img: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png'
    },
    {
      id: 48,
      text: 'wasup brotha',
      sent_datetime: new Date(2022, 0, 12, 6, 8, 4),
      chatroom_id: 4,
      img: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png'
    },
  ];
  return messages;
}

module.exports = {
  getFriendsList,
  getChatroomByUserID,
  getMessages
}