import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  type: 'doughnut',
  labels: ['investments', 'cash'],
  datasets: [
    {
      label: 'Balance Breakdown',
      data: [1000, 2024],
      backgroundColor: [
        'rgba(67, 83, 255, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderColor: [
        'rgba(67, 83, 255)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  plugins: {
    legend: false
  },
  responsive: true,
  maintainAspectRatio: false
};

export default function BalanceChart() {
  return (
    <Doughnut data={data} options={options}/>
  );
};