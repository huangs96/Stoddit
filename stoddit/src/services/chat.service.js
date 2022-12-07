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

  friendsList.map(friends => {
    if (friends.img === '') {
      console.log(friends);
    }
  })
  return friendsList;
};

module.exports = {
  getFriendsList
}