import {React, useState, useEffect} from 'react';
import { getTickers, getTickersByChatroomID } from '../../../services/ticker.service';

function TickersIndex() {
  const [chatroomKey, setChatroomKey] = useState([]);
  const [chatroomTickers, setAllChatroomTickers] = useState([]);
  const [allTickers, setAllTickers] = useState([]);

  useEffect(() => {
    let isLoaded = true;
    const getAllTickers = async () => {
      if (isLoaded) {
        const data = await getTickers();
        console.log('data', data);
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
    const getTickersByChatroomID = async () => {
      const data = await getTickersByChatroomID(chatroomKey);
    }
  })




  return (
    <div className='tickersContainer'>
      <h5>Tickers</h5>


    </div>
  )
}

export default TickersIndex