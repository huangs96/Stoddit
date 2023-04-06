import {React, useState, useEffect, useContext} from 'react';
import { getTickers, getTickersByChatroomID } from '../../../services/ticker.service';
import { SocketContext } from '../../../contexts/socketProvider';
import TickerCharts from './TickerComponents/TickerCharts';
import TickerTabs from './TickerComponents/TickerTabs';

function TickersIndex({liveChatroomKey, liveTickerReset, tickerSearch, tickerClear}) {
  const [chatroomTickers, setAllChatroomTickers] = useState([]);
  const [intervalTickers, setIntervalTickers] = useState([]);
  const [tickerNames, setTickerNames] = useState([]);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const socket = useContext(SocketContext);
  
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
      const iTickerValue = Object.values(iTicker)[0][0];
      if (iTickerValue.chatroom_id === liveChatroomKey) {
        tickerNames.map(names => {
          if (iTicker[names] !== undefined) {
            // console.log('live2', iTicker[names]);
            liveTickerUpdateObj[names] = iTicker[names];
          };
        });
      };
    });
    setAllChatroomTickers(liveTickerUpdateObj);
  }, [intervalTickers]);

  const filteredTickers = chatroomTickers.filter((users) => {
    if (allUsersInput == '') {
      searched = false;
      return allUsers;
    } else {
      searched = true;
      return users.username.toLowerCase().includes((allUsersInput));
    };
  });

  const displayTickersTab = tickerNames.map(names => {
    const tickerData = chatroomTickers[names];
    if (tickerData) {
      return (
      <TickerTabs ticker={tickerData[0]} />
      );
    };
  });

  return (
    <div className='tickersContainer'>
      {liveTickerReset &&
      displayTickersTab}
    </div>
  )
}

export default TickersIndex