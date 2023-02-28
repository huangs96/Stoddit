import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
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
        <Paper sx={{ width: 150, maxWidth: '100%'}}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <SendIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Message</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <DeleteOutlineIcon 
                  fontSize="small"
                  onClick={props.delete}
                />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <AccountBoxIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Profile</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </div>
    )
  }
  console.log('context props', props.delete);
  return (
    <>
      {menuTemplate()}
    </>
  );
};