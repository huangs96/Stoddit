import {React, useState, useEffect, useContext} from 'react';
import { getTickers, getTickersByChatroomID } from '../../../services/ticker.service';
import { SocketContext } from '../../../contexts/socketProvider';
import TickerCharts from './TickerComponents/TickerCharts';
import TickerTabs from './TickerComponents/TickerTabs';
import { getAllLiveChatrooms } from '../../../services/chat.service';

function TickersIndex({liveChatroomKey}) {
  const [chatroomTickers, setAllChatroomTickers] = useState([]);
  // const [allTickers, setAllTickers] = useState([]);
  const socket = useContext(SocketContext);

  
  useEffect(() => {
    let isLoaded = true;
    if (isLoaded && liveChatroomKey) {
      const getChatroomTickers = async () => {
        const data = await getTickersByChatroomID(liveChatroomKey);
        if (data) {
          setAllChatroomTickers(data);
        };
      };
      getChatroomTickers()
      .catch(console.error);
    };
    return () => {
      isLoaded = false;
    };
  }, [liveChatroomKey]);

  useEffect(() => {
    socket.on('tickerInterval', tickerData => {
      console.log('tickerData', tickerData);
      tickerData.map(ticker => {
        if (ticker.chatroom_id === liveChatroomKey) {
          setAllChatroomTickers(tickerData);
        };
      })
    });
    return () => {
      socket.off('ticker');
    };
  }, []);

  console.log('chatroomTickers111', chatroomTickers);

  const tickerNames = Object.keys(chatroomTickers);
  console.log('tickerNames', tickerNames);
  const displayTickersTab = tickerNames.map(names => {
    const tickerData = chatroomTickers[names];
    console.log('names3333', tickerData);
    return (
      <TickerTabs ticker={tickerData}/>
    );
  });

  return (
    <div className='tickersContainer'>
      {displayTickersTab}
    </div>
  )
}

export default TickersIndex