import React, { useState, useHistory } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContextMenu from './ContextMenu';
import { AppBar, Typography, Toolbar, Tabs, Tab, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { logoutUser } from '../services/auth.service';

function Header() {
  const [value, setValue] = useState('/home');
  const [showContextMenu, setShowContextMenu] = useState(false);
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
    setValue('Home');
    return navigate('/login');
  };

  const handleToggle = async () => {
    setShowContextMenu(true);
  };

  console.log('value header', value);

  if (window.location.pathname === '/login' || window.location.pathname === '/register') return null;

  return (
    <React.Fragment>
      <AppBar position='absolute'>
        <Toolbar>
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
            <Tab 
              icon={<PersonPinIcon />} 
              aria-label='person'
              value='Profile'
              component={Link}
              to={'/profile'}
              iconPosition='end'
            />
          </Tabs>
          <Button onClick={logout} sx={{marginLeft: 'auto'}} variant='contained'>Logout</Button>
          <PersonPinIcon onClick={handleToggle} sx={{marginLeft: 'auto'}}/>
          {showContextMenu &&
            <div>
              <ContextMenu>

              </ContextMenu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header