import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale, //x-axis
  LinearScale, //y-axis
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import config from './chartConfig';
import { style } from '@mui/system';

//modal needed

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

const roundedNumber = (price) => {
  return Math.round(price/100)*100;
};

const randomNumber = Math.random().toFixed(2);
const randomNumber10th = Math.floor(Math.random() * 10);
const randomNumber100th = Math.floor(Math.random() * 100);

function TickerCharts({ticker, timeData, priceData}) {
  // console.log('ticker chart', ticker);
  // console.log('priceData', priceData);
  const liveData = {
    labels: timeData,
    datasets: [{
      label: ticker.name,
      data: priceData,
      pointBorderColor: 'pink',
      pointBackgroundColor: 'pink',
      borderColor: 'pink',
      backgroundColor: '#84ACCE',
      fill: 'start',
    }]
  };

  const staticData = {
    labels: ['8:30am', '9:00am', '9:30am', '10:00am', '10:30am', '11:00am'],
    datasets: [{
      label: ticker.name,
      data: [ticker.current_price - randomNumber10th, ticker.current_price + randomNumber10th, ticker.current_price + randomNumber10th, ticker.current_price - randomNumber10th, ticker.current_price - randomNumber10th ,ticker.current_price],
      pointBorderColor: 'pink',
      pointBackgroundColor: 'pink',
      borderColor: 'pink',
      backgroundColor: '#84ACCE',
      fill: 'start',
    }]
  };
  
  const options = {
    plugins: {
      legend: true,
      tooltip: {
        enabled: true
      }
    },
    scales: {
      y: {
        min: roundedNumber(ticker.low_price),
        max: roundedNumber(ticker.high_price)
      },
    },
  };

  return (
    <div style={{
      margin: '30px',
      border: '3px'
    }}>
      <Line
        data={!timeData.includes(null) ? liveData : staticData}
        // data={liveData}
        options={options}
      >
      </Line>
    </div>
  )
}

export default TickerCharts