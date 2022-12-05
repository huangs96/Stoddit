import React, {useState} from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { AppBar, Typography, Toolbar, Tabs, Tab, Button} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function Header() {
  const [value, setValue] = useState();
  const routes = ['/chat', '/portfolio', '/login']
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
            <Tab label="Settings" />
          </Tabs>
          <Button sx={{marginLeft: "auto"}} variant="contained">Logout</Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header