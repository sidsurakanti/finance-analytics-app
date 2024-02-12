"use client"

import { Cashflow } from '@/lib/definitions';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, defaults } from 'chart.js';
import { Doughnut } from "react-chartjs-2";

interface ChartProps {
  cashflows: Cashflow,
  thisMonthTotal: number

}

export function Chart({ cashflows, thisMonthTotal }: ChartProps) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  // const income = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  // }).format(Number(cashflows.income));

  
  // TODO: add reoccuring 
  const data = {
  labels: ['Income', 'Expenses', 'Reoccuring'],
  datasets: [
      {
        label: '',
        data: [cashflows.income, thisMonthTotal, 0],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'left' as const,
        align: "start" as const,
      },
      title: {
        display: true,
        text: "Overview",
        color: "white",
      }
    },
  };

  return (
    <Doughnut data={data} options={options} />
  )
}