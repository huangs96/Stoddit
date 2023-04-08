import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
const date = new Date();
const displayDate = date.toLocaleString();


function preventDefault(event) {
  event.preventDefault();
};


export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Total Balance</Title>
      <Typography variant="h4" style={{paddingTop: '25px', fontWeight: 'bold'}} color="#4353FF">
        $3,024.00
      </Typography>
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