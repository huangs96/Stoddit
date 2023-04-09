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

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

const liveData = {
  labels: ['00:00'],
  datasets: [{
    label: 'Balance',
    data: data,
    pointBorderColor: 'pink',
    pointBackgroundColor: 'pink',
    borderColor: 'pink',
    backgroundColor: '#84ACCE',
    fill: 'start',
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
        // data={liveData}
        options={options}
      >
      </Line>
    // <React.Fragment>
    //   <Title>Today</Title>
    //   <ResponsiveContainer>
    //     <LineChart
    //       data={data}
    //       margin={{
    //         top: 16,
    //         right: 16,
    //         bottom: 0,
    //         left: 24,
    //       }}
    //     >
    //       <XAxis
    //         dataKey="time"
    //         stroke={theme.palette.text.secondary}
    //         style={theme.typography.body2}
    //       />
    //       <YAxis
    //         stroke={theme.palette.text.secondary}
    //         style={theme.typography.body2}
    //       >
    //         <Label
    //           angle={270}
    //           position="left"
    //           style={{
    //             textAnchor: 'middle',
    //             fill: theme.palette.text.primary,
    //             ...theme.typography.body1,
    //           }}
    //         >
    //           Balance ($)
    //         </Label>
    //       </YAxis>
    //       <Line
    //         isAnimationActive={false}
    //         type="monotone"
    //         dataKey="amount"
    //         stroke={theme.palette.primary.main}
    //         dot={false}
    //       />
    //     </LineChart>
    //   </ResponsiveContainer>
    // </React.Fragment>
  );
}
