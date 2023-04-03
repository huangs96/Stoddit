import React from 'react';
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

function TickerModal({onClose, open}) {
  return (
    <>
    <Dialog onClose={onClose} open={open}>

    </Dialog>
    <div>TickerModal</div>
    </>
  )
}

export default TickerModal