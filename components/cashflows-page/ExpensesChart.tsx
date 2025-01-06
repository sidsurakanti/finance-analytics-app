"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { dateFormatter } from "@/lib/utils";
import { SortedData } from "@/lib/data";

export function ExpensesChart({
  expenses,
  reoccuring,
}: {
  expenses: SortedData[];
  reoccuring: SortedData[];
}) {
  const expensesF = expenses.map((expense) => ({
    ...expense,
    total_amount: Math.abs(Number(expense.total_amount)),
  }));
  const reoccuringF = reoccuring.map((reoccuring) => ({
    ...reoccuring,
    total_amount: Math.abs(Number(reoccuring.total_amount)),
  }));

  // console.log("hrrr", formattedData);
  // console.log("GEEEEEEEEEE", formattedReoccuring)
  let data: Array<{ month: Date; reoccuring: number; expenses: number }> = [];

  for (let i = 0; i < 13; i++) {
    console.log(i);
    data.push({
      month: new Date(expensesF[i].month.getTime() + 86400000), // add one day in milliseconds
      expenses: Math.floor(expensesF[i].total_amount),
      reoccuring: Math.floor(reoccuringF[i].total_amount),
    });
  }

  return (
    <div className="bg-accent flex flex-col gap-5 rounded-xl p-4 shadow-md border border-border">
      <h1 className="text-lg">Last 12 months</h1>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => dateFormatter(value).slice(0, 3)}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent indicator="dashed" hideLabel />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="expenses"
            stackId="a"
            fill="var(--color-expenses)"
            radius={4}
          />
          <Bar
            dataKey="reoccuring"
            stackId="b"
            fill="var(--color-reoccuring)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
  reoccuring: {
    label: "Reoccuring",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;
