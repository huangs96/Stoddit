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
  const liveTickers = {};
  const tickerNames = Object.keys(chatroomTickers);
  
  
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
      // console.log('11111', tickerData);
      tickerNames.map(names => {
        tickerData.map(ticker => {
          if (ticker[names] !== undefined) {
            // console.log('11111', ticker[names]);
            setAllChatroomTickers(ticker[names]);
          };
        });
      });
    });
    return () => {
      socket.off('ticker');
    };
  }, []);

  const displayTickersTab = tickerNames.map(names => {
    const tickerData = chatroomTickers[names];
    console.log('2222', tickerData[0]);
    return (
      <TickerTabs ticker={tickerData[0]}/>
    );
  });

  return (
    <div className='tickersContainer'>
      {displayTickersTab}
    </div>
  )
}

export default TickersIndex