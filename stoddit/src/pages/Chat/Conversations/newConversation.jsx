import './newConversation.css';
import {useState, useEffect} from 'react';
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
import { getFriendsList, createNewChatroom } from '../../../services/chat.service';
import createNewChatroomWithParticipants from '../../../contexts/chatContext';

function NewConversation(props) {
  const startConversationData = [];
  const [friendsList, setFriendsList] = useState([]);
  let selectedFriend = false;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFriendsList();
      setFriendsList(data);
    }
    fetchData()
    .catch(console.error)
  }, [])
  console.log(friendsList)

  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleListItemClick = (value) => {
    selectedFriend = true;
    console.log(selectedFriend);
    console.log(value);
    startConversationData.push(value);



    // onClose(value);
  };
  const createConversation = (e) => {
    console.log('clicked');
    console.log('startConversationData', startConversationData);
    createNewChatroomWithParticipants();
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Start a Conversation</DialogTitle>
      <List sx={{ pt: 0 }}>
        {friendsList.map((friend, i) => (
          <ListItem 
            selected={selectedFriend ? true : false}
            button onClick={() => handleListItemClick(friend.contact_name)} 
            key={i}>
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