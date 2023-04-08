import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  legend: {
    display: false
  }
};
const data = {
  labels: ['investments', 'cash'],
  datasets: [
    {
      label: 'Balance Breakdown',
      data: [1000, 2024],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1,
    },
  ],
  options: {
    legend: {
      display: false
    }
  }
};

export default function BalanceChart() {
  return (
    <Doughnut data={data} options={options} />
  );
};