import React, { useState, useHistory } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Tabs, Tab, Button } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { logoutUser } from '../services/auth.service';

function Header() {
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const logout = async () => {
    const deleteDetails = await logoutUser();
    if (deleteDetails.error) {
      console.log(deleteDetails.error);
      return;
    }
    console.log(deleteDetails.message);
    return navigate('/login');
  };

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <iconButton aria-label="home" component={Link} to="/home">
            <ShowChartIcon />
          </iconButton>
          <Tabs 
            textColor="inherit" 
            value={value} 
            onChange={(e, value)=> setValue(value)} indicatorColor="secondary"
            orientation="horizontal"
          >
            <Tab 
              label="Chat"
              value={'/chat'}
              component={Link}
              to={'/chat'}
            />
            <Tab 
              label="Portfolio" 
              value={'/portfolio'}
              component={Link}
              to={'/portfolio'}
            />
            <Tab 
              label="Trade"
              value={'/trade'}
              component={Link}
              to={'/trade'} 
            />
            <Tab 
              icon={<PersonPinIcon />} 
              aria-label="person"
              value={'/profile'}
              component={Link}
              to={'/profile'}
            />
          </Tabs>
          <Button onClick={logout} sx={{marginLeft: "auto"}} variant="contained">Logout</Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header