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
    socket.on('ticker', tickerData => {
      console.log('tickerData', tickerData);
    });
    return () => {
      socket.off('ticker');
    };
  }, []);

  // useEffect(() => {
  //   let isLoaded = true;
  //   const getAllTickers = async () => {
  //     if (isLoaded) {
  //       const data = await getTickers();
  //       if (data) {
  //         setAllTickers(data);
  //       };
  //     };
  //   };
  //   getAllTickers()
  //   .catch(console.error);
  //   return () => {
  //     isLoaded = false;
  //   };
  // }, []);

  useEffect(() => {
    let isLoaded = true;
    if (isLoaded && liveChatroomKey) {
      const getChatroomTickers = async () => {
        const data = await getTickersByChatroomID(liveChatroomKey);
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
  }, [liveChatroomKey]);

  const tickerNames = Object.keys(chatroomTickers);
  const displayTickersTab = tickerNames.map(names => {
    const tickerData = chatroomTickers[names];
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