import './FriendsOnline.css';
import { useEffect, useState } from 'react';
import ContextMenu from '../../../components/ContextMenu';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';


function FriendsOnline({userID, username, friendsList, onlineFriends, allUsers, addUser, deleteUser, searched}) {
  const friendsListDictionary = new Map();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [points, setPoints] = useState({x: 0, y: 0});
  
  const rightClickFunction = async (e) => {
    console.log('menu opened');
    e.preventDefault();
    setShowContextMenu(true);
    console.log('e', e.pageX);
    console.log('e', e.pageY);
    setPoints({x: e.pageX, y: e.PageY});
  };

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [])

  const displayFriendsList = friendsList.map((friends, i) => {
    friendsListDictionary.set(friends.contact_name, i);

    if (friends.contact_img === null) {
      friends.contact_img = 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
    };
    if (onlineFriends.length > 1) {
      console.log('it got here map1');
      onlineFriends.map(onlineFriend => {
        if (onlineFriend === friends.contact_name_id) {
          return <div className="friendsOnline"
            onContextMenu={rightClickFunction}
          >
          <div className="chatOnlineFriend">
            <div className="friendOnlineImgContainer">
              <img
              className="friendsOnlineImg"
              src={friends.contact_img}
              alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="onlineFriendName" key={i}>{friends.contact_name}</span>
          </div>
        </div>
        };
      });
    } else if (friends.contact_name_id === onlineFriends) {
        console.log('one friend online');
        return <div className="friendsOnline"
          onContextMenu={rightClickFunction}
        >
          <div className="chatOnlineFriend">
            <div className="friendOnlineImgContainer">
              <img
              className="friendsOnlineImg"
              src={friends.contact_img}
              alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="onlineFriendName" key={i}>{friends.contact_name}</span>
          </div>
        </div>
    } else {
      return <div className="friendsOffline"
        onContextMenu={rightClickFunction}
      >
      <div className="chatOfflineFriend">
        <div className="friendOfflineImgContainer">
          <img
          className="friendsOfflineImg"
          src={friends.contact_img}
          alt=""
          />
          <div className="chatOfflineBadge"></div>
        </div>
        <span className="offlineFriendName" key={i}>{friends.contact_name}</span>
      </div>
    </div>
    };
  });

  const displaySearchedUser = allUsers.map((user,i) => {
    if (user.contact_img === null) {
      user.contact_img = 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
    };

    if (!friendsListDictionary.has(user.username) && user.username != username) {
      user.alreadyFriend = false;
    } else {
      user.alreadyFriend = true;
    };

    return <div className="friendsOffline">
      <div className="chatOfflineFriend">
        <div className="friendOfflineImgContainer">
          <img
          className="friendsOfflineImg"
          src={user.contact_img}
          alt=""
          />
          <div className="chatOfflineBadge"></div>
        </div>
        <span className="offlineFriendName" key={i}>{user.username}</span>
      </div>
      { !user.alreadyFriend &&
      <Box
        sx={{ p: 2 }}
      >
        <AddIcon
          sx={{ "&:hover": { color: "green" } }}
          onClick={() => addUser(userID, user.username)}
        >
        </AddIcon>
      </Box>
      }
    </div>
  });
  return (
    <>
      {
        showContextMenu &&
        <div>
          <ContextMenu
            message={'hello'}
            delete={deleteUser}
            top={points.y}
            left={points.x}
          >
          </ContextMenu>
        </div>
      }
      <div>
        {!searched ?
          displayFriendsList
          :
          displaySearchedUser
        }
      </div>
    </>
  );
}

export default FriendsOnline