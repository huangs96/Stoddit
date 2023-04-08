import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import BalanceChart from '../../../components/BalanceChart';
const date = new Date();
const displayDate = date.toLocaleString();


function preventDefault(event) {
  event.preventDefault();
};

const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const config = {
  type: 'doughnut',
  data: data,
};


export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Total Balance</Title>
      <Typography variant="h4" style={{paddingTop: '25px', fontWeight: 'bold'}} color="#4353FF">
        $3,024.00
      </Typography>
      <div style={{position: "relative"}}>
        <BalanceChart />
      </div>
      <Typography color="text.secondary" fontSize="12px" sx={{ flex: 1 }} style={{paddingTop: '10px'}}>
        last updated on {displayDate}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Portfolio
        </Link>
      </div>
    </React.Fragment>
  );
}