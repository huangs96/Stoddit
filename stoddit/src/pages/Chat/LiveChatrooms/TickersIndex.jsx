import {React, useState, useEffect, useContext} from 'react';
import { getTickers, getTickersByChatroomID } from '../../../services/ticker.service';
import { SocketContext } from '../../../contexts/socketProvider';
import TickerCharts from './TickerComponents/TickerCharts';
import TickerTabs from './TickerComponents/TickerTabs';

function TickersIndex({liveChatroomKey}) {
  const [chatroomTickers, setAllChatroomTickers] = useState([]);
  const [intervalTickers, setIntervalTickers] = useState([]);
  const socket = useContext(SocketContext);
  // const liveTickers = {};
  const [tickerNames, setTickerNames] = useState([]);

  
  
  useEffect(() => {
    let isLoaded = true;
    if (isLoaded && liveChatroomKey) {
      const getChatroomTickers = async () => {
        const data = await getTickersByChatroomID(liveChatroomKey);
        if (data) {
          setAllChatroomTickers(data);
          setTickerNames(Object.keys(data));
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
      setIntervalTickers(tickerData);
    });
    return () => {
      socket.off('ticker');
    };
  }, []);

  useEffect(() => {
    const liveTickerUpdateObj = {};
    intervalTickers.map(iTicker => {
      console.log('itick', Object.values(iTicker));
      // console.log('itick2', chatroomTickers);
      // if (iTicker[0].chatroom_id === liveChatroomKey) {
      //   console.log(
      //     'live', iTicker
      //   );
      // };
    });
  }, [intervalTickers])


  const displayTickersTab = tickerNames.map(names => {
    // console.log('names2222222', names);
    // console.log('ticker', chatroomTickers);
    const tickerData = chatroomTickers[names];
    // console.log('tickerData', tickerData);
    if (tickerData.length >= 2) {
      // console.log('tickerData more than', tickerData[0]);
      return (
      <TickerTabs ticker={tickerData[0]} />
      );
    } else {
      console.log('tickerData less than', tickerData)
      return (
        <TickerTabs ticker={tickerData} />
      );
    };
  });

  return (
    <div className='tickersContainer'>
      {displayTickersTab}
    </div>
  )
}

export default TickersIndex