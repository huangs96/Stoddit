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
  const [onlineFriends, setOnlineFriends] = useState([]);
  //socket
  const socket = useRef();

  /* ------ Socket Connection ------ */
  //run socket connection once only

  useEffect(() => {

    socket.current = io('ws://localhost:5000', {
      withCredentials: true,
    });

    socket.current.on('getUsers', users => {
      setOnlineFriends(users);
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

    console.log('ran');
    console.log('socket', socket);

    return () => {
      socket.current.off('chatMessage');
      socket.current.off('getUsers');
      socket.current.off('getUserMessage');
      console.log('sockets returned');
    };
  }, []);

  useEffect(() => {
    socket.current.emit('liveUsers', userID);

    return () => {
      socket.current.off('liveUsers');
      console.log('liveusers returned');
    }
  }, [userID]);

  /* ------ Socket End ------ */

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

  console.log('userID', userID);
  console.log('userParticipantID', userParticipantID);
  console.log('participantsinChatroom', participantsInChatroom);
  console.log('chatroomKey', chatroomKey);
  console.log('conversations---', conversations);
  console.log('messages', messages);
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
    }

  }, []);

  useEffect(() => {
    let isLoaded = true;
    const fetchParticipantDataFromChatroomID = async (chatroomKey) => {
      console.log('fetchParticipant--------', chatroomKey);
      const data = await getParticipantIDFromChatroomID(chatroomKey);
      console.log('data', data);
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
      setMessages(data);
    };
    console.log('selectConversations', messages);
    console.log('key', key);
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
              <div onClick={()=> selectConversation(convo.chatroom_id)}>
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
            <FriendsOnline userID={userID}/>
          </div>
        </div>   
      </div>
    </>
  );
};

export default ChatIndex