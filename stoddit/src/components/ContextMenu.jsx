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
          <MenuItem>Message</MenuItem>
          <MenuItem onClick={props.delete}>Delete</MenuItem>
          <MenuItem>View Profile</MenuItem>
        </Menu>
      </div>
    );
  };
  console.log('context props', props.delete);
  return (
    <>
      {menuTemplate()}
    </>
  );
};