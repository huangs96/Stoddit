import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SocketContext } from '../contexts/socketProvider';
import ContextMenu from './ContextMenu';
import viewProfile from '../helpers/menuHelpers'
import { AppBar, Box, Toolbar, Tabs, Tab, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logoutUser } from '../services/auth.service';

function Header() {
  const [value, setValue] = useState(localStorage.getItem('currentPage'));
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const styles = {
    customizeToolbar: {
      height: 100
    }
  };
  useEffect(() => {
    if (value !== null) {
      localStorage.setItem('currentPage', value);
    };
  }, [value]);


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

  if (window.location.pathname === '/login' || window.location.pathname === '/register') {
    return null
  };

  console.log('value', value);

  return (
    <React.Fragment>
      <AppBar position='relative' elevation={1} style={{ background: '#FFFFFF', zIndex: 1400}}>
        <Toolbar className={styles.customizeToolbar}>
          <Box display='flex' flexGrow={1} justifyContent='center'>
            <Tabs 
              value={value}
              onChange={(e, value)=> setValue(value)}
              orientation='horizontal'
              TabIndicatorProps={{
                style: {
                display: 'none',
                }
              }}
            >
              <Tab
                style={{borderRadius:'12px'}}
                value='Home'
                component={Link}
                to={'/home'}
                icon={<HomeIcon sx={{color: value === 'Home' ? "#4353FF" : "FFFFFF"}}/>}
              />
              <Tab
                style={{borderRadius:'12px'}}
                value='Chat'
                component={Link}
                to={'/chat'}
                icon={<ChatIcon sx={{color: value === 'Chat' ? "#4353FF" : "FFFFFF"}}/>}
              />
              <Tab 
                style={{borderRadius:'12px'}}
                value='Portfolio'
                component={Link}
                to={'/portfolio'}
                icon={<RecentActorsIcon sx={{color: value === 'Portfolio' ? "#4353FF" : "FFFFFF"}}/>}
              />
              <Tab 
                style={{borderRadius:'12px'}}
                value='Trade'
                component={Link}
                to={'/trade'}
                icon={<ShowChartIcon sx={{color: value === 'Trade' ? "#4353FF" : "FFFFFF"}}/>}
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