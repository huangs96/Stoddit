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
import { getFriendsList } from '../../../services/chat.service';

function NewConversation(props) {
  const [friendsList, setFriendsList] = useState([]);

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
    console.log(value);
    //create new chatroom, need to write API endpoint for creating new chatroom and participants



    // onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Start a Conversation</DialogTitle>
      <List sx={{ pt: 0 }}>
        {friendsList.map((friend, i) => (
          <ListItem button onClick={() => handleListItemClick(friend.contact_name)} key={i}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={friend.contact_name} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
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