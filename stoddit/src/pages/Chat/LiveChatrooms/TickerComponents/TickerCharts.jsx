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
  Colors
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import config from './chartConfig';

//modal needed

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Colors
);

const roundedNumber = (price) => {
  return Math.round(price/100)*100;
};

const randomNumber = Math.random().toFixed(2);
const randomNumber10th = Math.floor(Math.random() * 10);
const randomNumber100th = Math.floor(Math.random() * 100);



function TickerCharts({ticker, timeData, priceData}) {
  console.log('ticker chart', ticker);
  const liveData = {
    labels: timeData,
    datasets: [{
      // labels: 'Hello',
      data: priceData,
    }]
  };

  const staticData = {
    labels: ['8:30am', '9:00am', '9:30am', '10:00am', '10:30am', '11:00am'],
    datasets: [{
      data: [ticker.current_price - randomNumber10th, ticker.current_price + randomNumber10th, ticker.current_price + randomNumber10th, ticker.current_price - randomNumber10th, ticker.current_price - randomNumber10th ,ticker.current_price],
      borderColor: '#FF6384',
      backgroundColor: '#FFB1C1',
    }]
  };
  
  const options = {
    plugins: {
      legend: true
    },
    scales: {
      y: {
        min: roundedNumber(ticker.low_price),
        max: roundedNumber(ticker.high_price)
      },
    },
  };

  return (
    <Line
      data={!timeData.includes(null) ? liveData : staticData}
      options={options}
    >
    </Line>
  )
}

export default TickerCharts