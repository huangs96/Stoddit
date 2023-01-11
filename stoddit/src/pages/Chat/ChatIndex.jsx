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
      console.log(messageData);
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
    // setDeletedConversation(boolean => !boolean);
    setUserHasLeftConversation(boolean => !boolean);
  };

  // console.log('userID', userID);
  // console.log('userParticipantID', userParticipantID);
  // console.log('participantsinChatroom', participantsInChatroom);
  // console.log('chatroomKey', chatroomKey);
  // console.log('conversations---', conversations);
  // console.log('messages', messages);
  console.log('friendsOnline ChatIndex', onlineFriendsData);
  console.log('friendsList ChatIndex', friendsList);
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

  }, []);

  useEffect(() => {
    let isLoaded = true;
    if (isLoaded) {
      const fetchParticipantDataFromChatroomID = async (chatroomKey) => {
        const data = await getParticipantIDFromChatroomID(chatroomKey);
        setParticipantsInChatroom(data);
        participantsInChatroom.map(participants => {
          if(participants.account_id === userID) {
            setUserParticipantID(participants.account_id);
          };
        });
      };
      if (chatroomKey) {
        fetchParticipantDataFromChatroomID(chatroomKey);
      };
    };

    return () => {
      isLoaded = false;
    };
  }, [messages.length]);

  const onChangeMessage = (e) => {
    const message = e.target.value;
    setMessageText(message);
  };

  const selectConversation = async (key) => {
    if (key) {
      const data = await getMessagesByChatroomID(key);
      setChatroomKey(key);
      setMessages(data);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('sent');
    if (messageText) {
      const receiverID = participantsInChatroom.filter((item) => {
        return item.id !== userParticipantID;
      });

      addMessageToConversation(userParticipantID, messageText, timestamp, receiverID);

      setMessages(msgData => [...msgData, {
        account_id: userID,
        message_text: messageText,
        ownMessage: true,
        participant_id: userParticipantID,
        sent_datetime: timestamp.toDateString()
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
              // onlineFriends={onlineFriends}
            />
          </div>
        </div>   
      </div>
    </>
  );
};

export default ChatIndex