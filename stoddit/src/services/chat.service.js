//get friends list from database
const getFriendsList = () => {
  const friendsList = [ 
    { 
      id: 49,
      username: 'Stephen Huang',
      img: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png'
    }, 
    {
      id: 50,
      username: 'test1',
      img: 'https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg'
    }, 
    { 
      id: 51,
      username: 'test2',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScuQGyYbgV9HFyiunO9mF6_lnB6MYwcx6t3w&usqp=CAU'
    },
    { 
      id: 52,
      username: 'test3',
      img: ''
    }
  ];
  //if no img for user, use default photo
  friendsList.map(friends => {
    if (friends.img === '') {
      friends.img = 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
    }
  })
  return friendsList;
};

//get cchatrooms from database
const getChatrooms = () => {
  const chatrooms = [
    {
      name: 'Stephen Huang',
      title: 'Stephen Huang',
      description: 'n/a',
      chatroom_id: 3,
      img: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png'
    },
    {
      name: 'test1',
      title: 'test1',
      description: 'test2',
      chatroom_id: 4,
      img: 'https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg'
    },
  ];
  return chatrooms;
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
  getChatrooms,
  getMessages
}