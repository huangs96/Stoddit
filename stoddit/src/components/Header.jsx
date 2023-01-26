import React, { useState, useHistory } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Tabs, Tab, Button } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { logoutUser } from '../services/auth.service';

function Header() {
  const [value, setValue] = useState('/home');
  const navigate = useNavigate();

  const logout = async () => {
    const deleteDetails = await logoutUser();
    if (deleteDetails.error) {
      console.log(deleteDetails.error);
      return;
    }
    console.log(deleteDetails.message);
    localStorage.clear();
    console.log('localstorage should be cleared', localStorage);
    return navigate('/login');
  };

  if (window.location.pathname === '/login' || window.location.pathname === '/register') return null;

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <iconButton aria-label='home' component={Link} to='/home'>
            <ShowChartIcon />
          </iconButton>
          <Tabs 
            textColor='inherit' 
            value='Chat'
            onChange={(e, value)=> setValue(value)} indicatorColor='secondary'
            orientation='horizontal'
          >
            <Tab 
              label='Chat'
              value='Chat'
              component={Link}
              to={'/chat'}
            />
            <Tab 
              label='Portfolio' 
              value='Portfolio'
              component={Link}
              to={'/portfolio'}
            />
            <Tab 
              label='Trade'
              value='Trade'
              component={Link}
              to={'/trade'} 
            />
            <Tab 
              icon={<PersonPinIcon />} 
              aria-label='person'
              value='Profile'
              component={Link}
              to={'/profile'}
            />
          </Tabs>
          <Button onClick={logout} sx={{marginLeft: 'auto'}} variant='contained'>Logout</Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header