import './FriendsOnline.css';
import { useEffect, useState } from 'react';
import ContextMenu from '../../../components/ContextMenu';
import { createNewChatroomWithParticipants } from '../../../contexts/chatContext';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';


function FriendsOnline({userID, username, friendsList, onlineFriends, allUsers, addUser, deleteUser, searched, getNewConversation}) {
  const friendsListDictionary = new Map();
  const [selectedFriendID, setSelectedFriendID] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /* -------- Context Menu ---------*/
  const messageUser = () => {
    friendsList.map((friend) => {
      if (friend.id === selectedFriendID) {
        const conversationData = {
          name: '',
          description: '',
          userIDs: [userID, selectedFriendID],
          lDate: null
        };
        let newGeneratedChatroomID = createNewChatroomWithParticipants(conversationData);
        console.log('newGeneratedCID friendsOline', newGeneratedChatroomID);
        getNewConversation(newGeneratedChatroomID, conversationData.name, conversationData.description, friend.username);
      };
    });
  };
  const deleteFriend = () => {
    deleteUser(selectedFriendID);
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
    setSelectedFriendID(friend.id);
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

    if (onlineFriends.length > 1) {
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