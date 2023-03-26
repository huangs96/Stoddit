import {React, useState, useEffect} from 'react';
import { getTickers, getTickersByChatroomID } from '../../../services/ticker.service';
import TickerDisplay from './TickerComponents/TickerDisplay';

function TickersIndex() {
  const [chatroomKey, setChatroomKey] = useState(287);
  const [chatroomTickers, setAllChatroomTickers] = useState([]);
  const [allTickers, setAllTickers] = useState([]);
  console.log('chatroomKey Tickers', chatroomKey);

  useEffect(() => {
    let isLoaded = true;
    const getAllTickers = async () => {
      if (isLoaded) {
        const data = await getTickers();
        // console.log('data', data);
        if (data) {
          setAllTickers(data);
        };
      };
    };
    getAllTickers()
    .catch(console.error);
    return () => {
      isLoaded = false;
    };
  }, []);

  useEffect(() => {
    let isLoaded = true;
    if (isLoaded) {
      const getChatroomTickers = async () => {
        console.log('data2222', chatroomKey);
        const data = await getTickersByChatroomID(chatroomKey);
        if (data) {
          setAllChatroomTickers(data);
          // console.log('allChatroomTickers', data);
        };
      };
      getChatroomTickers()
      .catch(console.error);
    };
    return () => {
      isLoaded = false;
    };
  }, []);



  return (
    <div className='tickersContainer'>
      <h5>Tickers</h5>
      <TickerDisplay 
        chatroomTickers={chatroomTickers}
      />
    </div>
  )
}

export default TickersIndex