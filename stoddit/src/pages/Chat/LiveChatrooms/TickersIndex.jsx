import {React, useState, useEffect, useContext} from 'react';
import { getTickers, getTickersByChatroomID } from '../../../services/ticker.service';
import { SocketContext } from '../../../contexts/socketProvider';
import TickerDisplay from './TickerComponents/TickerDisplay';
import { getAllLiveChatrooms } from '../../../services/chat.service';

function TickersIndex() {
  const [chatroomKey, setChatroomKey] = useState(287);
  const [chatroomTickers, setAllChatroomTickers] = useState([]);
  const [allTickers, setAllTickers] = useState([]);
  const socket = useContext(SocketContext);
  // console.log('chatroomKey Tickers', chatroomTickers);

  useEffect(() => {
    socket.on('ticker', tickerData => {
      console.log('tickerData', tickerData);
    });
    return () => {
      socket.off('ticker');
    };
  }, []);

  useEffect(() => {
    let isLoaded = true;
    const getLiveChatrooms = async () => {
      if (isLoaded) {
        const data = await getAllLiveChatrooms();
        if (data) {
          console.log('data', data);
        };
      };
    };
    getLiveChatrooms()
    .catch(console.error);

    return () => {
      isLoaded = false;
    };
  }, []);

  useEffect(() => {
    let isLoaded = true;
    const getAllTickers = async () => {
      if (isLoaded) {
        const data = await getTickers();
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
        const data = await getTickersByChatroomID(chatroomKey);
        if (data) {
          setAllChatroomTickers(data);
          console.log('allChatroomTickers', data);
        };
      };
      getChatroomTickers()
      .catch(console.error);
    };
    return () => {
      isLoaded = false;
    };
  }, [chatroomKey]);



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