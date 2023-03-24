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

const chart = new Chart({
  type: 'line',
  data: data,
  options: {
  }
});

function TickerCharts({ticker}) {
  // console.log('chart', LineController, LineElement, PointElement);
  return (
    // <div 
    //   className="friendsOffline"
    //   >
    //   <div className="chatOfflineFriend">
    //     <div className="friendOfflineImgContainer">
    //     </div>
    //     <span className="offlineFriendName">{ticker.name}</span>
    //   </div>
    // </div>
    {chart}
  )
}

export default TickerCharts