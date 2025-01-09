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
  // format props
  // * cashflows.color is only used for the list item color
  const cashflows = [
    {
      name: "Reoccuring",
      amount: Number(reoccuring),
      color: "bg-indigo-500",
    },
    {
      name: "Expenses",
      amount: Number(expenses),
      color: "bg-rose-300",
    },
    {
      name: "Remaining",
      amount: Number(balance),
      color: "bg-emerald-500",
    },
  ];

  return (
    <Card className="bg-accent dark:bg-accent dark:text-accent-foreground outline outline-none">
      <DonutChart
        data={cashflows}
        variant="donut"
        category="amount"
        index="name"
        className={"text-3xl h-72 tracking-wide"} // change size of the label text inside the donut
        colors={["indigo-500", "rose-300", "emerald-500"]} // change this if you want the donut colors to be different
        valueFormatter={cashFormatter}
        customTooltip={customTooltip}
        showAnimation
      />

      {/* chart key and details */}
      <List className="mt-4">
        <ListItem className="p-4">
          <div className="flex gap-2 items-center text-xl text-accent-foreground">
            <span>Income</span>
          </div>

          <p className="font-medium text-xl text-accent-foreground/70 tracking-wide">
            {cashFormatter(Number(income))}
          </p>
        </ListItem>

        {cashflows.map((cashflow, index) => (
          <ListItem key={index} className="p-4">
            <div className="flex gap-3 items-center text-xl text-accent-foreground">
              <span className={`${cashflow.color} h-3 w-3 rounded-full`} />
              <span>{cashflow.name}</span>
            </div>

            <p className="font-medium text-xl text-accent-foreground/70 tracking-wide">
              {cashFormatter(Number(cashflow.amount))}
            </p>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

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
          {cashFormatter(categoryPayload.value)}
        </p>
      </span>
    </div>
  );
};
