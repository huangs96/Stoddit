import React, {useEffect, useState, useContext} from 'react';
import { SocketContext } from '../../../../contexts/socketProvider';
import TickerCharts from './TickerCharts';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import chevronDown from '../../../../images/chevron-down.svg'
import chevronUp from '../../../../images/chevron-up.svg';

function TickerModal({onClose, open, ticker}) {
  const [realtime, setRealTime] = useState(null);
  const [timeDataArray, setTimeDataArray] = useState([]);
  const [priceDataArray, setPriceDataArray] = useState([]);
  const socket = useContext(SocketContext);
  const date = new Date();
  const displayDate = date.toLocaleDateString();
  const displayTimeDate = date.toLocaleTimeString();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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

  useEffect(() => {
    if (priceDataArray.length < 6) {
      console.log('here', priceDataArray.length);
      setPriceDataArray(prices => [...prices, ticker.current_price]);
    } else {
      console.log('here2', priceDataArray.length);
      priceDataArray.shift();
      setPriceDataArray(prices => [...prices, ticker.current_price]);
    };
  }, [ticker]);

  // console.log('time1', timeDataArray);
  // console.log('price1', priceDataArray);

  const arrowDisplay = (
    <img
      src={ticker.changePercentage < 0 ?
      chevronDown
      :
      chevronUp
    }
    >
    </img>
  );

  return (
    <>
    <Dialog 
      onClose={onClose} 
      open={open}
      PaperProps={{ 
        sx: { 
          width: "100%", 
          height: "75%" 
        } 
      }}
    >
      <DialogTitle variant="h5">
        <h2 style={{
          margin: '1px'
        }}>
          {ticker.name}
        </h2>
        <h6 style={{
          color: 'gray',
          margin: '1px'
        }}>
          {ticker.symbol}
        </h6>
          {displayTimeDate}
        <div className={ticker.changePercentage < 0 && ticker.changePercentage != 0 ? "modalChangePercentageN" : "modalChangePercentageP"}>{ticker.changePercentage}%
        {ticker.changePercentage != 0 && arrowDisplay}
        </div>
      </DialogTitle>
      <TickerCharts 
        ticker={ticker}
        timeData={timeDataArray}
        priceData={priceDataArray}
      />
      <Grid 
        container 
        rowSpacing={4} 
        columnSpacing={{ 
          xs: 1, sm: 1, md: 6 
        }}
        style={{
          padding: "15px",
          justifyContent: "space-around"
        }}
      >
        <Grid item xs={5}>
          <Item>Date</Item>
          <Item><b>{displayDate}</b></Item>
        </Grid>
        <Grid item xs={5}>
          <Item>Recommendation</Item>
          <Item><b>{ticker.recommendation}</b></Item>
        </Grid>
        <Grid item xs={5}>
          <Item>Current Price</Item>
          <Item><b>{ticker.current_price}</b></Item>
        </Grid>
        <Grid item xs={5}>
          <Item>Change Percentage</Item>
          <Item><b>{ticker.changePercentage}%</b></Item>
        </Grid>
        <Grid item xs={5}>
          <Item>Day Range</Item>
          <Item><b>{ticker.low_price} - {ticker.high_price}</b></Item>
        </Grid>
        <Grid item xs={5}>
          <Item>Volume</Item>
          <Item><b>{ticker.volume}</b></Item>
        </Grid>
      </Grid>
    </Dialog>
    </>
  )
}

export default TickerModal