import './ChatIndex.css';
import React, { useState, useEffect, useRef, useContext } from 'react';
import UserContext from '../../contexts/userContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Conversation from './Conversations/Conversation';
import NewConversation from './Conversations/newConversation'
import Message from './Messages/Message';
import FriendsOnline from './ChatOnline/FriendsOnline';
import { getUser } from '../../services/user.service';
import { addMessageToConversation } from '../../contexts/chatContext';
import { 
  getChatroomByUserID,
  deleteChatroomByID,
  getParticipantIDFromChatroomID,
  getParticipantIDFromAccountID, 
  getMessagesByChatroomID,
} from '../../services/chat.service';
import { SocketProvider } from '../../contexts/socketProvider';
import { io } from 'socket.io-client';


/* ------ Socket Connection ------ */
const socket = io('http://localhost:5000', {
  withCredentials: true,
});
/* ------ Socket End ------ */

function ChatIndex() {
  //user data
  const userData = useContext(UserContext)
  console.log('userdata', userData);
  const userID = userData.user.id;
  const username = userData.user.username;
  const waitForData = (username !== '');
  //message state
  const [participantID, setParticipantID] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [addNewMessage, setAddNewMessage] = useState({});
  const timestamp = new Date();
  const bottomRef = useRef(null);
  //chatroom state
  const [chatroomKey, setChatroomKey] = useState('');
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState(false);
  //--state for deleting conversation
  const [deletedConversation, setDeletedConversation] = useState(false);
  const [renderMessagesAfterDelete, setRenderMessageAfterConvoDelete] = useState(false);

  //opening and closing new conversation modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //get new conversation from conversation modal
  const getNewConversation = () => {
    setNewConversation(boolean => !boolean);
  };
  //delete conversation state
  const conversationDeleted = () => {
    setDeletedConversation(boolean => !boolean);
  };
  // const reRenderMessages = () => {
    
  // }

  //get corresponding messages from conversations file
  const getChatroomKey = (key) => {
    setChatroomKey(key);
  };
  
    // //on socket connection
    // socket.on('connection', () => {
    //   console.log('working');
    // });
    // //console message from socket
    // socket.on('message', message => {
    //   console.log("ChatIndex: socket", message);
    // });

    // return () => {
    //   socket.off('chatMessage');
    // };

  console.log('addnewmsg chatindex', addNewMessage);
  console.log('newConversation chatindex', newConversation);

  //load conversations
  useEffect(() => {
    const getChatroomData = async () => {
      const chatroomData = await getChatroomByUserID(userID);
      setConversations(chatroomData);
    };
    getChatroomData();
    setNewConversation(false);
  }, [newConversation, deletedConversation]);

  //second useEffect to get messages based on chatroomkey
  useEffect(() => {
    const fetchMessageData = async () => {
      const messageData = await getMessagesByChatroomID(chatroomKey);
      setMessages(messageData);
    };
    fetchMessageData()
    .catch(console.error);
  }, [chatroomKey, addNewMessage]);

  //get participant id of user from chatroom
  if(chatroomKey) {
    const fetchParticipantDataFromChatroomID = async (chatroomKey) => {
      const data = await getParticipantIDFromChatroomID(chatroomKey);
      data.map(values => {
        //if current user id matches account_id in chatroom, set the participant id
        if(userID === values.account_id) {
          setParticipantID(values.id);
        };
      });
    };
    fetchParticipantDataFromChatroomID(chatroomKey);
  };

  const onChangeMessage = (e) => {
    const message = e.target.value;
    setMessageText(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText) {
      addMessageToConversation(participantID, messageText, timestamp);
    };

    // //emit message to server
    // socket.emit('chatMessage', message);

    // //emit message back to frontend
    // socket.on('chatMessage', chatMessage => {
    //   setAddNewMessage(chatMessage);
    // });

    setAddNewMessage({participantID, messageText, timestamp});

    //empty textbox
    setMessageText('');
  }

  return (
    <>
    {/* <SocketProvider chatroom_id={chatroomKey}> */}
    {waitForData &&
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
            {
              conversations.map((convo) => (
                <Conversation 
                  getChatroomKey={getChatroomKey} 
                  conversation={convo}
                  conversationDeleted={conversationDeleted}
                />
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
                addNewMessage={addNewMessage}
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
    }
    {/* </SocketProvider> */}
    </>
  );
};

export default ChatIndex