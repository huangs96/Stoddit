import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['investments', 'cash'],
  datasets: [
    {
      label: 'Balance Breakdown',
      data: [1000, 2024],
      borderWidth: 1,
    },
  ],
};

export default function BalanceChart() {
  return (
    <Doughnut data={data} />
  );
};