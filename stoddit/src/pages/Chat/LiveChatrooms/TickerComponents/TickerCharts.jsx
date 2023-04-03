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


function TickerCharts({ticker}) {
  console.log('ticker chart', ticker);
  const data = {
    labels: ['8:00am', '8:30am', '8:30am', '8:30am', '8:30am', '8:30am'],
    datasets: [{
      // labels: 'Hello',
      data: [500, 600, 700],
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
      data={data}
      options={options}

    >

    </Line>
  )
}

export default TickerCharts