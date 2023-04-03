import React, {useEffect, useState, useContext} from 'react';
import { SocketContext } from '../../../../contexts/socketProvider';
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
import chevronDown from '../../../../images/chevron-down.svg'
import chevronUp from '../../../../images/chevron-up.svg';

function TickerModal({onClose, open, ticker}) {
  const [realtime, setRealTime] = useState(null);
  const [timeDataArray, setTimeDataArray] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('tickerTime', newTime => {
      setRealTime(newTime);
    });
    return () => {
      socket.off('tickerTime');
    };
  }, []);

  useEffect(() => {
    if (timeDataArray.length < 6) {
      console.log('here', timeDataArray.length);
      setTimeDataArray(times => [...times, realtime]);
    } else {
      console.log('here2', timeDataArray.length);
      timeDataArray.shift();
      setTimeDataArray(times => [...times, realtime]);
    };
  }, [realtime]);

  console.log('time1', timeDataArray);

  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'space-between',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 10,
  };

  const timeForChartData = timeDataArray.map(data => {
    console.log('data', data);
  });

  const arrowDisplay = (
    <img
      src={ticker.changePercentage < 0 ?
      chevronDown
      :
      chevronUp
    }
      alt={ticker.changePercentage < 0 ?
      chevronDown
      :
      chevronUp
    }
    >
    </img>
  )

  return (
    <>
    <Dialog onClose={onClose} open={open}>
      <Box sx={style} textAlign='center'>
      <DialogTitle variant="h4">
        {ticker.name}
      </DialogTitle>
      <div className="modalTickerList">
          <div className="modalTickerNameSymbolContainer">
          <div className="modalTickerSymbol">{ticker.symbol}</div>
          <div className="modalTickerName">{ticker.name}</div>
        </div>
        <div className="modalPriceContainer">
          <div className={ticker.changePercentage < 0 ?"modalChangePercentageN" : "modalChangePercentageP"}>{ticker.changePercentage}%
          {arrowDisplay}
          </div>
          <div className={ticker.changePercentage < 0 ?"currentCPriceN" : "currentCPriceP"}>{ticker.current_price}</div>
          <div className="modalTickerVolume">{ticker.volume}</div>
        </div>
        </div>
      <TickerCharts 
        ticker={ticker}
      />
      </Box>
    </Dialog>
    </>
  )
}

export default TickerModal