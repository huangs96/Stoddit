import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SocketContext } from '../contexts/socketProvider';
import ContextMenu from './ContextMenu';
import viewProfile from '../helpers/menuHelpers'
import { AppBar, Box, Typography, Toolbar, Tabs, Tab, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logoutUser } from '../services/auth.service';

function Header() {
  const [value, setValue] = useState('/home');
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const logout = async () => {
    const deleteDetails = await logoutUser();
    if (deleteDetails.error) {
      console.log(deleteDetails.error);
      return;
    };
    console.log(deleteDetails.message);
    localStorage.clear();
    console.log('localstorage should be cleared', localStorage);
    socket.emit('logout');
    setValue('Home');
    setShowContextMenu(false);
    return navigate('/login');
  };

  const handleToggle = async (e) => {
    setAnchorEl(e.currentTarget);
    setShowContextMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowContextMenu(false);
  };

  const viewProfile = () => {
    setValue(null);
    setShowContextMenu(false);
    return navigate('/profile');
  };
   
  const fill = {
    'View Profile': viewProfile,
    'Logout': logout
  };

  console.log('value header', value);

  if (window.location.pathname === '/login' || window.location.pathname === '/register') return null;

  return (
    <React.Fragment>
      <AppBar position='absolute' style={{ background: '#FFFFFF' }}>
        <Toolbar>
          <Box display='flex' flexGrow={1} justifyContent='center'>
            <Tabs 
              value={value}
              onChange={(e, value)=> setValue(value)}
              orientation='horizontal'
            >
              <Tab 
                value='Home'
                component={Link}
                to={'/home'}
                icon={<HomeIcon />}
              />
              <Tab 
                value='Chat'
                component={Link}
                to={'/chat'}
                icon={<ChatIcon />}
              />
              <Tab 
                value='Portfolio'
                component={Link}
                to={'/portfolio'}
                icon={<RecentActorsIcon />}
              />
              <Tab 
                value='Trade'
                component={Link}
                to={'/trade'}
                icon={<ShowChartIcon />}
              />
            </Tabs>
          </Box>
          <IconButton size='large'>
            <AccountCircleIcon style={{color:'black'}} onClick={handleToggle} sx={{marginLeft: 'auto'}}/>
          </IconButton>
        </Toolbar>
      </AppBar>
            {showContextMenu &&
              <ContextMenu
                anchorEl={anchorEl}
                open={open}
                fill={fill}
                onClose={handleClose}
              >
              </ContextMenu>
            }
    </React.Fragment>
  )
}

export default Header