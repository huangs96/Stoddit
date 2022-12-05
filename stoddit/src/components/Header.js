import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Tabs, Tab, Button} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { logoutUser } from '../services/auth.service';

function Header() {

  const [value, setValue] = useState();
  const routes = ['/chat', '/portfolio', '/trade', '/profile'];

  let navigate = useNavigate();

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
          <ShowChartIcon />
          <Tabs textColor="inherit" value={value} onChange={(e, value)=> setValue(value)} indicatorColor="secondary">
            <Tab 
              label="Chat"
              value={routes[0]}
              component={Link}
              to={routes[0]}
            />
            <Tab 
              label="Portfolio" 
              value={routes[1]}
              component={Link}
              to={routes[1]}
            />
            <Tab 
              label="Trade"
              value={routes[2]}
              component={Link}
              to={routes[2]} 
            />
            <Tab 
              icon={<PersonPinIcon />} 
              aria-label="person"
              value={routes[3]}
              component={Link}
              to={routes[3]}
            />
          </Tabs>
          <Button onClick={logout} sx={{marginLeft: "auto"}} variant="contained">Logout</Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header