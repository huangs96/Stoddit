import React from 'react';
import { AppBar, Typography, Toolbar} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function Header() {
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography>
            <ShowChartIcon />
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header