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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

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

function TickerCharts({ticker}) {
  return (
    <div 
      className="friendsOffline"
      >
      <div className="chatOfflineFriend">
        <div className="friendOfflineImgContainer">
        </div>
        <span className="offlineFriendName">{ticker.name}</span>
      </div>
    </div>
    // <Line
    //   data={data}
    //   options={options}

    // >

    // </Line>
  )
}

export default TickerCharts