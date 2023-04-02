import {React, useState, useEffect, useContext} from 'react';
import { getTickers, getTickersByChatroomID } from '../../../services/ticker.service';
import { SocketContext } from '../../../contexts/socketProvider';
import TickerCharts from './TickerComponents/TickerCharts';
import TickerTabs from './TickerComponents/TickerTabs';

function TickersIndex({liveChatroomKey}) {
  const [chatroomTickers, setAllChatroomTickers] = useState([]);
  // const [allTickers, setAllTickers] = useState([]);
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
    socket.on('tickerInterval', tickerData => {
      const liveTickers = {};
      console.log('11111', tickerData);
      console.log('names0000', tickerNames);
      tickerNames.map(names => {
        // console.log('names111111', names);
        // tickerData.map(ticker => {
        //   if (ticker[names] !== undefined && !liveTickers[ticker[names][0].name]) {
        //     liveTickers[ticker[names][0].name] = ticker[names];
        //     console.log('11111', liveTickers);
        //   };
        // });
      });
      // setAllChatroomTickers(liveTickers);
    });
    return () => {
      isLoaded = false;
    };

  }, [liveChatroomKey]);
  
  // useEffect(() => {
  //   socket.on('tickerInterval', tickerData => {
  //     const liveTickers = {};
  //     // console.log('11111', tickerData);
  //     console.log('names0000', tickerNames);
  //     tickerNames.map(names => {
  //       console.log('names111111', names);
  //       // tickerData.map(ticker => {
  //       //   if (ticker[names] !== undefined && !liveTickers[ticker[names][0].name]) {
  //       //     liveTickers[ticker[names][0].name] = ticker[names];
  //       //     console.log('11111', liveTickers);
  //       //   };
  //       // });
  //     });
  //     // setAllChatroomTickers(liveTickers);
  //   });
  //   return () => {
  //     socket.off('ticker');
  //   };
  // }, [liveChatroomKey]);

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