import './ChatIndex.css';
import React, { 
  useState, 
  useEffect, 
  useRef
} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Conversation from './Conversations/Conversation';
import NewConversation from './Conversations/newConversation'
import Message from './Messages/Message';
import FriendsOnline from './ChatOnline/FriendsOnline';
import { addMessageToConversation } from '../../contexts/chatContext';
import { 
  getChatroomByUserID,
  getParticipantIDFromChatroomID,
  getMessagesByChatroomID,
  getFriendsListById
} from '../../services/chat.service';
import { io } from 'socket.io-client';

function ChatIndex() {
  //user data
  const userID = JSON.parse(localStorage.getItem('UserID'));
  const username = JSON.parse(localStorage.getItem('Username'));
  //message state
  const [userParticipantID, setUserParticipantID] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const timestamp = new Date();
  const bottomRef = useRef(null);
  //chatroom state
  const [chatroomKey, setChatroomKey] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState(false);
  //deleting chatroom
  // const [deletedConversation, setDeletedConversation] = useState(false);
  const [userHasLeftConversation, setUserHasLeftConversation] = useState(false);
  //participants
  const [participantsInChatroom, setParticipantsInChatroom] = useState([]);
  //friends
  const [friendsList, setFriendsList] = useState([]);
  const [onlineFriendsData, setOnlineFriendsData] = useState([]);
  //socket
  const socket = useRef();

  /* ------ Socket Connection ------ */
  //run socket connection once only

  useEffect(() => {

    socket.current = io('ws://localhost:5000', {
      withCredentials: true,
    });

    //need to get live updates of when friends are offline and online, so far can only get online friends

    socket.current.on('getUsers', users => {
      if(users.length > 1) {
        users.map(user => {
          if (user.userID !== userID) {
            setOnlineFriendsData(user);
          };
        });
      } else {
        setOnlineFriendsData([]);
      };
    });

    socket.current.on('getUserMessage', message => {
      console.log('messageOnClient', message);
    });

    socket.current.on('chatMessage', messageData => {
      console.log('messagedata', messageData);
      setMessages(msgData => [...msgData, {
        message_text: messageData.text,
        participantID: messageData.receiverID[0].id,
        sent_datetime: timestamp.toLocaleDateString()
      }]);
    });

    return () => {
      socket.current.off('chatMessage');
      socket.current.off('getUsers');
      socket.current.off('getUserMessage');
      console.log('sockets returned');
    };
  }, []);

  //emit to backend which users are live
  useEffect(() => {
    socket.current.emit('liveUsers', userID);

    return () => {
      socket.current.off('liveUsers');
    };
  }, [userID]);

  /* ------ Socket End ------ */

  /* ------ Friends List ------ */
  useEffect(() => {
    let isLoaded = true;
    if (isLoaded) {
      const fetchFriendsListByID = async () => {
        const data = await getFriendsListById(userID);
        setFriendsList(data);
      };
      fetchFriendsListByID()
      .catch(console.error);
    };
    return () => {
      isLoaded = false;
    };
  }, []);
  /* --------------------------------- */

  /* ------ Conversation Modal ------ */
  //opening and closing new conversation modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getNewConversation = () => {
    setNewConversation(boolean => !boolean);
  };
  
  const conversationDeleted = () => {
    setUserHasLeftConversation(boolean => !boolean);
  };

  // console.log('userID', userID);
  // console.log('userParticipantID', userParticipantID);
  // console.log('participantsinChatroom', participantsInChatroom);
  // console.log('chatroomKey', chatroomKey);
  console.log('conversations---', conversations);
  // console.log('messages', messages);
  // console.log('friendsOnline ChatIndex', onlineFriendsData);
  // console.log('friendsList ChatIndex', friendsList);
  /* --------------------------------- */

  useEffect(() => {
    let isLoaded = true;
    const getChatroomData = async () => {
      const chatroomData = await getChatroomByUserID(userID);
      if (isLoaded) {
        setConversations(chatroomData);
      };
    };
    getChatroomData()
    .catch(console.error);

    return () => {
      isLoaded = false;
    };

  }, [newConversation, userHasLeftConversation]);

  useEffect(() => {
    let isLoaded = true;
    const getChatroomDataByChatroomID = async () => {
      const chatroomData = await getMessagesByChatroomID(chatroomKey);
      setMessages(chatroomData);
      if (chatroomData) {
        const participantData = await getParticipantIDFromChatroomID(chatroomKey);
        setParticipantsInChatroom(participantData);
      };
    };

    if (isLoaded && chatroomKey) {
      getChatroomDataByChatroomID();
    } else {
      console.log('click conversation');
    };

    return () => {
      isLoaded = false;
      console.log('getMessagesFromChatroom returned');
    };


  }, [chatroomKey, newConversation, userHasLeftConversation]);

  
  const selectConversation = (key) => {
    if (key) {
      setChatroomKey(key);
    };
  };
  
  const onChangeMessage = (e) => {
    const message = e.target.value;
    setMessageText(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('sent');
    if (messageText) {
      const receiverID = participantsInChatroom.filter((item) => {
        if (item.account_id !== userID) {
          return item.id;
        };
      });

      const userParticipant = participantsInChatroom.find((item) => {
        if (item.account_id === userID) {
          setUserParticipantID(item.id);
          return item;
        };
      });

      addMessageToConversation(userParticipant, messageText, timestamp, receiverID);

      setMessages(msgData => [...msgData, {
        account_id: userID,
        chatroom_id: chatroomKey,
        deleted_at: null,
        message_text: messageText,
        ownMessage: true,
        participant_id: userParticipant,
        sent_datetime: timestamp.toDateString(),
        username: username
      }]);
    } else {
      console.log('no message');
    };

    //empty textbox
    setMessageText('');
  };

  return (
    <>
      <div 
      style={{ marginTop:'10vh'}} 
      className="chat"
      >
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <TextField 
            className="chatMenuInput" 
            label="Search Chats, Friends, or Users"
          >
          </TextField>
          <div>
          <h2>{username}'s Conversations</h2>
          </div>
          {
            conversations.map((convo) => (
              <div 
                onClick={() => {
                  selectConversation(convo.chatroom_id);          
                }}
              >
                <Conversation 
                  conversation={convo}
                  userParticipantID={userParticipantID}
                  conversationDeleted={conversationDeleted}
                />
              </div>
            ))
          }
          <Button
            onClick={handleOpen} 
            variant="contained"
          >
            New Conversation
          </Button>
          <NewConversation 
            userID={userID}
            open={open}
            friendsList={friendsList}
            onClose={handleClose}
            getNewConversation={getNewConversation}
          />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message 
              userID={userID} 
              messages={messages}
              userHasLeft={userHasLeftConversation}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="chatBoxBottom">
              <TextField 
                name="message"
                className="chatMessageInput" 
                size="large" 
                placeholder="Send a message.."
                onChange={onChangeMessage}
                value={messageText}
              />
              <Button 
                type="submit" 
                variant="contained" 
                className="chatSubmitButton" 
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <FriendsOnline 
              userID={userID}
              friendsList={friendsList}
              onlineFriends={onlineFriendsData}
            />
          </div>
        </div>   
      </div>
    </>
  );
};

export default ChatIndex