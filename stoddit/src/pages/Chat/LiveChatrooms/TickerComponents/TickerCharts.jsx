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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import config from './chartConfig';

//modal needed

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

const roundedNumber = (price) => {
  return Math.round(price/100)*100;
};
const priceRandommizer = (currentPrice) => {
  const randomNumber = Math.random().toFixed(2);
  const randomNumber10th = Math.floor(Math.random() * 10);
  const randomNumber100th = Math.floor(Math.random() * 100);
  const priceChangeRandomizer = Math.random() < 0.5;
  const randomPriceArray = [];
  if (currentPrice < 500 && currentPrice.length <= 6 && priceChangeRandomizer) {
    const newPrice = currentPrice + randomNumber10th;
    randomPriceArray.push(newPrice);
  } else if (currentPrice < 500 && currentPrice.length > 6 && priceChangeRandomizer) {
    const newPrice = currentPrice + randomNumber10th;
  }
}


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
    labels: [],
    datasets: [{
      data: [ticker.currentPrice - 100, ticker.currentPrice + 100, ticker.currentPrice + 180, ticker.currentPrice - 132, ticker.currentPrice - 100 ,ticker.currentPrice]
    }]
  }
  
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