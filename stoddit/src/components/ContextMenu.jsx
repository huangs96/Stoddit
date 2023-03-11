import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function ContextMenu(props) {
  const deleteFriend = () => {
    props.delete(props.selectedFriend);
  };
  
  const menuTemplate = () => {
    return (
      <div>
        <Menu
          anchorEl={props.anchorEl}
          open={props.open}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem>{props.fill['first']}</MenuItem> 
          //message
          <MenuItem onClick={deleteFriend}>{props.fill['second']}</MenuItem>
          //delete
          <MenuItem>{props.fill['third']}</MenuItem>
          //view profile
        </Menu>
      </div>
    );
  };
  console.log(props.selectedFriend);
  return (
    <>
      {menuTemplate()}
    </>
  );
};