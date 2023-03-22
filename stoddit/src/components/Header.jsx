import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import ContextMenu from './ContextMenu';
import viewProfile from '../helpers/menuHelpers'
import { AppBar, Box, Typography, Toolbar, Tabs, Tab, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { logoutUser } from '../services/auth.service';

function Header() {
  const [value, setValue] = useState('/home');
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const socket = useRef();
  socket.current = io('ws://localhost:5000', {
    withCredentials: true,
  });

  const navigate = useNavigate();

  const logout = async () => {
    const deleteDetails = await logoutUser();
    if (deleteDetails.error) {
      console.log(deleteDetails.error);
      return;
    };
    socket.current.disconnect();
    console.log(deleteDetails.message);
    localStorage.clear();
    console.log('localstorage should be cleared', localStorage);
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
      <AppBar position='absolute'>
        <Toolbar>
          <Box display='flex' flexGrow={1}>
            <Tabs 
              textColor='inherit' 
              value={value}
              onChange={(e, value)=> setValue(value)} indicatorColor='secondary'
              orientation='horizontal'
            >
              <Tab 
                // label='Home'
                value='Home'
                component={Link}
                to={'/home'}
                icon={<HomeIcon />}
                iconPosition='start'
              />
              <Tab 
                // label='Chat'
                value='Chat'
                component={Link}
                to={'/chat'}
                icon={<ChatIcon />}
                iconPosition='start'
              />
              <Tab 
                // label='Portfolio' 
                value='Portfolio'
                component={Link}
                to={'/portfolio'}
                icon={<RecentActorsIcon />}
                iconPosition='start'
              />
              <Tab 
                // label='Trade'
                value='Trade'
                component={Link}
                to={'/trade'}
                icon={<ShowChartIcon />}
                iconPosition='start'
              />
              {/* <Tab 
                icon={<PersonPinIcon />} 
                aria-label='person'
                value='Profile'
                component={Link}
                to={'/profile'}
                iconPosition='end'
              /> */}
            </Tabs>
          </Box>
          <IconButton size='large'>
            <PersonPinIcon onClick={handleToggle} sx={{marginLeft: 'auto'}}/>
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