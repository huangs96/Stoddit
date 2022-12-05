import React from 'react';
import { AppBar, Typography} from '@mui/material';

function Header() {
  return (
    <React.Fragment>
      <AppBar>
        <Typography>
          Stoddit
        </Typography>
      </AppBar>
    </React.Fragment>
  )
}

export default Header