import * as React from 'react';
import { useTheme } from '@mui/material/styles';
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import {
  Chart as ChartJS,
  CategoryScale, //x-axis
  LinearScale, //y-axis
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Title from './Title';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

const data = [
  3012, 1111, 2428, 2900, 1880, 2500, 3042, 3024
];

const liveData = {
  labels: ['8:30am', '9:00am', '9:30am', '10:00am', '10:30am', '11:00am'],
  datasets: [{
    label: 'Balance',
    data: data,
    pointBorderColor: '#4353FF',
    pointBackgroundColor: '#FFFFFF',
    borderColor: '#4353FF',
    // backgroundColor: '#84ACCE',
    // fill: 'start',
  }]
};

const options = {
  plugins: {
    legend: false,
    tooltip: {
      enabled: true
    }
  },
  scales: {
    y: {
      min: 0,
      max: 3500
    },
  },
};

export default function Chart() {
  const theme = useTheme();

  return (
      <Line
        data={liveData}
        options={options}
      >
      </Line>
  );
}
