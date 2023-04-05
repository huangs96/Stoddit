import React, {useEffect, useState, useContext} from 'react';
import { SocketContext } from '../../../../contexts/socketProvider';
import TickerCharts from './TickerCharts';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
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

  console.log('time1', timeDataArray);
  console.log('price1', priceDataArray);

  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'space-between',
    bgcolor: 'background.paper',
    p: 10,
  };

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
      PaperProps={{ sx: { width: "100%", height: "60%" } }}
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
        <div className={ticker.changePercentage < 0 ? "modalChangePercentageN" : "modalChangePercentageP"}>{ticker.changePercentage}%
        {arrowDisplay}
        </div>
      </DialogTitle>
      <TickerCharts 
        ticker={ticker}
        timeData={timeDataArray}
        priceData={priceDataArray}
      />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Days Range</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Price&nbsp;($)</TableCell>
              <TableCell align="right">Recommendation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                <TableCell align="right">{displayDate}</TableCell>
                <TableCell align="right">{ticker.low_price} - {ticker.high_price}</TableCell>
                <TableCell align="right">{ticker.volume}</TableCell>
                <TableCell align="right">{ticker.current_price}</TableCell>
                <TableCell align="right">{ticker.recommendation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">{displayDate}</TableCell>
                <TableCell align="right">{ticker.low_price} - {ticker.high_price}</TableCell>
                <TableCell align="right">{ticker.volume}</TableCell>
                <TableCell align="right">{ticker.current_price}</TableCell>
                <TableCell align="right">{ticker.recommendation}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
    </>
  )
}

export default TickerModal