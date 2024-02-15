"use client";

import { DonutChart, Card, List, ListItem } from "@tremor/react";
import { cashFormatter } from "@lib/utils";

interface Props {
  income: string;
  expenses: string;
  reoccuring: string;
  balance: string;
}

type CustomTooltip = {
  payload: any;
  active: boolean | undefined;
  label: any;
};

export function Chart({ income, expenses, reoccuring, balance }: Props) {
  // format props to be used in the chart
  const cashflows = [
    {
      name: "Reoccuring",
      amount: Number(reoccuring),
      color: "bg-yellow-500",
    },
    {
      name: "Expenses",
      amount: Number(expenses),
      color: "bg-indigo-500",
    },
    {
      name: "Remaining",
      amount: Number(balance),
      color: "bg-green-500",
    },
  ];

  return (
    <Card className="dark:bg-accent dark:text-accent-foreground">
      <DonutChart
        data={cashflows}
        category="amount"
        index="name"
        variant="donut"
        className="text-3xl h-72" // change size of the label text inside the donut
        colors={["yellow-500", "indigo-500", "green-500"]}
        valueFormatter={valueFormatter}
        customTooltip={customTooltip}
        showAnimation
      />

      <List className="mt-4">
        <ListItem className="p-4">
          <div className="flex gap-2 items-center text-xl text-accent-foreground">
            <span>Income</span>
          </div>

          <p className="font-medium text-xl text-accent-foreground/70">
            {valueFormatter(Number(income))}
          </p>
        </ListItem>

        {cashflows.map((cashflow, index) => (
          <ListItem key={index} className="p-4">
            <div className="flex gap-2 items-center text-xl text-accent-foreground">
              <span className={`${cashflow.color} h-3 w-3 rounded-full`} />
              <span>{cashflow.name}</span>
            </div>

            <p className="font-medium text-xl text-accent-foreground/70">
              {valueFormatter(Number(cashflow.amount))}
            </p>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

// format value into usd and add a $ sign
const valueFormatter = (number: number) => "$" + cashFormatter(number);

// custom tooltip
// appears everytime you hover over a part of the donut
const customTooltip = (props: CustomTooltip) => {
  const { payload, active } = props;
  if (!active || !payload) return null;

  const categoryPayload = payload?.[0];
  if (!categoryPayload) return null;

  return (
    <div className="w-56 flex flex-1 space-x-2 rounded-md border border-border bg-secondary p-2 text-sm shadow-md">
      {/* color block */}
      <p
        className={`w-2 flex flex-col bg-${categoryPayload?.color} rounded-sm`}
      />

      {/* category name and value */}
      <span className="w-full flex items-center justify-between">
        <p className="whitespace-nowrap text-right text-secondary-foreground">
          {categoryPayload.name}
        </p>
        <p className="whitespace-nowrap text-right font-medium text-secondary-foreground/75">
          {categoryPayload.value}
        </p>
      </span>
    </div>
  );
};
