import React from 'react';
import TickerCharts from './TickerCharts';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

function TickerModal({onClose, open, ticker}) {

  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
    <Dialog onClose={onClose} open={open}>
      <Box sx={style} textAlign='center'>
      <DialogTitle variant="h4">
        Ticker
      </DialogTitle>
      <TickerCharts 
        ticker={ticker}
      />
      </Box>
    </Dialog>
    </>
  )
}

export default TickerModal