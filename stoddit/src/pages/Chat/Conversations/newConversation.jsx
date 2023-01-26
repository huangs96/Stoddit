import './newConversation.css';
import {useState, useEffect} from 'react';
import { TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { getFriendsListById, createNewChatroom, getUserIDByUsername } from '../../../services/chat.service';
import { createNewChatroomWithParticipants } from '../../../contexts/chatContext';
import { getUser } from '../../../services/user.service';

function NewConversation(props) {
  const [conversationName, setConversationName] = useState('');
  const [conversationTitle, setConversationTitle] = useState('');
  const [conversationDescription, setConversationDescription] = useState('');
  const todaysDate = new Date();
  let selectedFriend = false;
  
  const startConversationData = {
    chatroomName: '',
    chatroomTitle: '',
    chatroomDescription: '',
    userIDs: [],
    sDate: todaysDate,
    lDate: null
  };

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const onChangeConversationName = (e) => {
    const conversationName = e.target.value;
    console.log(conversationName);
    setConversationName(conversationName);
  };
  
  const onChangeConversationTitle = (e) => {
    const conversationTitle = e.target.value;
    setConversationTitle(conversationTitle);
  };

  const onChangeConversationDescription = (e) => {
    const conversationDescription = e.target.value;
    setConversationDescription(conversationDescription);
  };

  const handleListItemClick = async (value) => {
    selectedFriend = true;
    const idFromUsername = await getUserIDByUsername(value);
    const finalIDFromUsername = idFromUsername[0].id;

    if (startConversationData.userIDs.length === 0) {
      startConversationData.userIDs.push(finalIDFromUsername);
    } else if (!startConversationData.userIDs.includes(finalIDFromUsername)) {
      startConversationData.userIDs.push(finalIDFromUsername);
    } else {
      return;
    };
  };

  const createConversation = async (e) => {
    //populating conversation data object
    startConversationData.chatroomName = conversationName;
    startConversationData.chatroomTitle = conversationTitle;
    startConversationData.chatroomDescription = conversationDescription;
    startConversationData.userIDs.push(props.userID);

    
    let chatroomIDGenerated = await createNewChatroomWithParticipants(startConversationData);

    props.getNewConversation(chatroomIDGenerated, conversationName);

    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Start a Conversation</DialogTitle>
      <TextField
        name="conversationName"
        className="conversationName"
        label="Conversation Name" 
        variant="filled" 
        size="small"
        onChange={onChangeConversationName}
        value={conversationName}
      />
      <TextField 
        name="conversationTitle"
        className="conversationTitle"
        label="Conversation Title" 
        variant="filled" 
        size="small" 
        onChange={onChangeConversationTitle}
        value={conversationTitle}
      />
      <TextField 
        name="conversationDescription"
        className="conversationDescription"
        label="Conversation Description" 
        variant="filled" 
        size="small"
        onChange={onChangeConversationDescription}
        value={conversationDescription}
      />
      <Typography>
        Select Friends to Join Conversation
      </Typography>
      <List sx={{ pt: 0 }}>
        {props.friendsList.map((friend, i) => (
          <ListItem 
            selected={selectedFriend ? true : false}
            button onClick={() => handleListItemClick(friend.contact_name)} 
            key={i}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={friend.contact_name} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={createConversation}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Create Conversation" />
        </ListItem>
      </List>
    </Dialog>
  );
}

NewConversation.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default NewConversation;