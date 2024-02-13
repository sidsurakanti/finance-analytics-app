"use client";

import { DonutChart, Card, List, ListItem } from "@tremor/react";

const valueFormatter = (number: number) =>
  "$" + Intl.NumberFormat("us").format(number).toString();

interface Props {
  income: string;
  expenses: string;
}

type CustomTooltipTypeDonut = {
  payload: any;
  active: boolean | undefined;
  label: any;
};

export function Chart({ income, expenses }: Props) {
  const cashflows = [
    {
      name: "Remaining",
      amount: Number(income) - Number(expenses),
      color: "bg-blue-500",
    },
    {
      name: "Expenses",
      amount: Number(expenses),
      color: "bg-indigo-500",
    },
    {
      name: "Reoccuring",
      amount: 0,
      color: "bg-green-500",
    },
  ];

  const customTooltip = (props: CustomTooltipTypeDonut) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    const categoryPayload = payload?.[0];
    if (!categoryPayload) return null;
    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        <div className="flex flex-1 space-x-2.5">
          <div
            className={`flex w-1.5 flex-col bg-${categoryPayload?.color} rounded`}
          />
          <div className="w-full">
            <div className="flex items-center justify-between space-x-8">
              <p className="whitespace-nowrap text-right text-tremor-content">
                {categoryPayload.name}
              </p>
              <p className="whitespace-nowrap text-right font-medium text-tremor-content-emphasis">
                {categoryPayload.value}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="grid xl:grid-cols-2 dark:bg-accent dark:text-accent-foreground">
      <DonutChart
        data={cashflows}
        category="amount"
        index="name"
        variant="donut"
        className="text-xl"
        colors={["blue-500", "indigo-500"]}
        valueFormatter={valueFormatter}
        customTooltip={customTooltip}
        showAnimation
      />
      <List className="mt-4">
        <ListItem>
          <span>Income</span>
          <span className="font-medium">{valueFormatter(Number(income))}</span>
        </ListItem>
        {cashflows.map((cashflow, index) => (
          <ListItem key={index}>
            <div className="flex gap-2 items-center">
              <span className={`${cashflow.color} h-2 w-2 rounded-full`}></span>
              <span>{cashflow.name}</span>
            </div>
            <span className="font-medium">
              {valueFormatter(cashflow.amount)}
            </span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
