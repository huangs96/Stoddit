//get friends list from database
const getFriendsList = () => {
  const friendsList = [ 
    { 
      username: 'Stephen Huang',
      img: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png'
    }, 
    {
      username: 'Delicia Li',
      img: 'https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg'
    }, 
    { 
      username: 'Richard Zhen',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScuQGyYbgV9HFyiunO9mF6_lnB6MYwcx6t3w&usqp=CAU'
    },
    {
      username: 'test1',
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

//get conversations(chatrooms) from database
const getConversations = () => {
  
};

//get participants from database
const getParticipants = () => {

};

//get messages from database
const getMessages = () => {
  const messages = [
    {
      id: 48,
      text: 'hey baby',
      sent_datetime: 2023-12-08,
    }
  ]

}

module.exports = {
  getFriendsList,
  getMessages
}