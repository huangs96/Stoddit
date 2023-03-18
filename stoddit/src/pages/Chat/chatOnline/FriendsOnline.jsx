import './FriendsOnline.css';
import { useEffect, useState } from 'react';
import ContextMenu from '../../../components/ContextMenu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';


function FriendsOnline({userID, username, friendsList, onlineFriends, allUsers, addUser, deleteUser, searched}) {
  const friendsListDictionary = new Map();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /* -------- Context Menu ---------*/
  const messageUser = () => {
    console.log('message function');
  };
  const deleteFriend = () => {
    deleteUser(selectedFriend);
  };
  const viewProfile = () => {
    console.log('view profile function')
  };

  const fill = {
    'Message': messageUser,
    'Delete': deleteFriend,
    'View Profile': viewProfile
  };
  
  const handleToggle = async (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    setShowContextMenu(true);
  };

  const selectFriend = async (friend) => {
    setSelectedFriend(friend.id);
  };

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener('click', handleClick);
    setAnchorEl(null);
    return () => window.removeEventListener('click', handleClick);
  }, []);
  /* ------------------------- */

  const displayFriendsList = friendsList.map((friends, i) => {
    friendsListDictionary.set(friends.contact_name, i);

    if (!friends.imgUrl) {
      friends.imgUrl= 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
    };

    if (onlineFriends.length > 1) {
      console.log('it got here map1');
      onlineFriends.map(onlineFriend => {
        if (onlineFriend === friends.contact_name_id) {
          return <div className="friendsOnline"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onContextMenu={(e) => {
              handleToggle(e);
              selectFriend(friends);
            }}
          >
            <div className="chatOnlineFriend">
              <div className="friendOnlineImgContainer">
                <img
                className="friendsOnlineImg"
                src={friends.imgUrl}
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
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onContextMenu={(e) => {
            handleToggle(e);
            selectFriend(friends);
          }}
        >
          <div className="chatOnlineFriend">
            <div className="friendOnlineImgContainer">
              <img
              className="friendsOnlineImg"
              src={friends.imgUrl}
              alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="onlineFriendName" key={i}>{friends.contact_name}</span>
          </div>
        </div>
    } else {
      return <div className="friendsOffline"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onContextMenu={(e) => {
          handleToggle(e);
          selectFriend(friends);
        }}
      >
      <div className="chatOfflineFriend">
        <div className="friendOfflineImgContainer">
          <img
          className="friendsOfflineImg"
          src={friends.imgUrl}
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
    if (user.imgUrl === null) {
      user.imgUrl = 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
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
          src={user.imgUrl}
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
            anchorEl={anchorEl}
            open={open}
            fill={fill}
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