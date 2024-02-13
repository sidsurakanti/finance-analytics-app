// "use client"

// import { Cashflow } from '@/lib/definitions';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, defaults } from 'chart.js';
// import { Doughnut } from "react-chartjs-2";

// interface ChartProps {
//   cashflows: Cashflow,
//   thisMonthTotal: number

// }

// export function Chart({ cashflows, thisMonthTotal }: ChartProps) {
//   ChartJS.register(ArcElement, Tooltip, Legend);

//   // const income = new Intl.NumberFormat('en-US', {
//   //   style: 'currency',
//   //   currency: 'USD',
//   // }).format(Number(cashflows.income));

//   // TODO: add reoccuring
//   const data = {
//   labels: ['Leftover', 'Expenses', 'Reoccuring'],
//   datasets: [
//       {
//         label: '',
//         data: [(Number(cashflows.income) - thisMonthTotal).toString(), thisMonthTotal, 0],
//         backgroundColor: [
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//         ],
//         borderColor: [
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 99, 132, 1)',
//           'rgba(255, 206, 86, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         display: true,
//         position: 'left' as const,
//         align: "start" as const,
//       },
//       title: {
//         display: true,
//         text: "Overview",
//         color: "white",
//       }
//     },
//   };

//   return (
//     <Doughnut data={data} options={options} />
//   )
// }

"use client";

// 'use client';
import { Card, DonutChart, List, ListItem } from "@tremor/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const data = [
  {
    name: "Travel",
    amount: 6730,
    share: "32.1%",
    color: "bg-cyan-500",
  },
  {
    name: "IT & equipment",
    amount: 4120,
    share: "19.6%",
    color: "bg-blue-500",
  },
  {
    name: "Training & development",
    amount: 3920,
    share: "18.6%",
    color: "bg-indigo-500",
  },
  {
    name: "Office supplies",
    amount: 3210,
    share: "15.3%",
    color: "bg-violet-500",
  },
  {
    name: "Communication",
    amount: 3010,
    share: "14.3%",
    color: "bg-fuchsia-500",
  },
];

const currencyFormatter = (number: number) => {
  return "$" + Intl.NumberFormat("us").format(number).toString();
};

export function Chart() {
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg">
        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Total expenses by category
        </h3>
        <DonutChart
          className="mt-8"
          data={data}
          category="amount"
          index="name"
          valueFormatter={currencyFormatter}
          showTooltip={false}
          colors={[
            "blue-900",
            "blue-800",
            "blue-700",
            "blue-600",
            "blue-500",
            "blue-400",
          ]}
        />
        <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          <span>Category</span>
          <span>Amount / Share</span>
        </p>
        <List className="mt-2">
          {data.map((item) => (
            <ListItem key={item.name} className="space-x-6">
              <div className="flex items-center space-x-2.5 truncate">
                <span
                  className={classNames(
                    item.color,
                    "h-2.5 w-2.5 shrink-0 rounded-sm",
                  )}
                  aria-hidden={true}
                />
                <span className="truncate dark:text-dark-tremor-content-emphasis">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {currencyFormatter(item.amount)}
                </span>
                <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                  {item.share}
                </span>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
}
