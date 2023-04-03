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


function TickerCharts({ticker}) {
  console.log('ticker chart', ticker);
  const data = {
    labels: ['8:00am', '8:30am', '9:00am'],
    datasets: [{
      // labels: 'Hello',
      data: [3, 6, 9],
    }]
  };
  
  const options = {
    plugins: {
      legend: true
    },
    scales: {
      y: {
        min: 120,
        max: 180
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