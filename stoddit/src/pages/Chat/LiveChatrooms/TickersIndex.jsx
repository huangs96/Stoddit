import {React, useState, useEffect} from 'react';
import { getTickers } from '../../../services/ticker.service';

function TickersIndex() {
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    let isLoaded = true;
    const getAllTickers = async () => {
      if (isLoaded) {
        const data = await getTickers();
        console.log('data', data);
        if (data) {
          setTickers(data);
        };
      };
    };
    getAllTickers()
    .catch(console.error);
    return () => {
      isLoaded = false;
    };
  }, []);


  return (
    <div className='tickersContainer'>
      <h5>Tickers</h5>


    </div>
  )
}

export default TickersIndex