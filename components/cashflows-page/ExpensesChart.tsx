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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { dateFormatter } from "@/lib/utils";
import { SortedData } from "@/lib/data";
import { Dispatch, SetStateAction } from "react";

export function ExpensesChart({
  expenses,
  reoccuring,
  handleTimespanChange,
}: {
  expenses: SortedData[] | undefined;
  reoccuring: SortedData[] | undefined;
  handleTimespanChange: Dispatch<
    SetStateAction<"6 months" | "1 year" | "3 months">
  >;
}) {
  if (!expenses || !reoccuring) {
    return <>Loading...</>;
  }

  const expensesF = expenses.map((expense) => ({
    ...expense,
    total_amount: Math.abs(Number(expense.total_amount)),
  }));
  const reoccuringF = reoccuring.map((reoccuring) => ({
    ...reoccuring,
    total_amount: Math.abs(Number(reoccuring.total_amount)),
  }));

  let data: Array<{ month: Date; reoccuring: number; oneTime: number }> = [];

  for (let i = 0; i < expensesF.length; i++) {
    data.push({
      month: new Date(expensesF[i].month.getTime() + 86400000), // add one day in milliseconds
      oneTime: Math.floor(expensesF[i].total_amount),
      reoccuring: Math.floor(reoccuringF[i].total_amount),
    });
  }

  return (
    <div className="bg-accent flex flex-col gap-5 rounded-xl p-4 shadow-md border border-border">
      <span className="flex justify-between items-center gap-5">
        <h1 className="text-lg">Spending</h1>
        {/* <h3 className="text-accent-foreground/80">Last 6 months</h3> */}

        <Select
          onValueChange={(value: "6 months" | "1 year" | "3 months") =>
            handleTimespanChange(value)
          }
        >
          <SelectTrigger className="max-w-36">
            <SelectValue placeholder="3 months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3 months">3 months</SelectItem>
            <SelectItem value="6 months">6 months</SelectItem>
            <SelectItem value="1 year">1 year</SelectItem>
          </SelectContent>
        </Select>
      </span>

      <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
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
            content={<ChartTooltipContent indicator="dashed" hideLabel />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="oneTime"
            stackId="a"
            fill="var(--color-oneTime)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="reoccuring"
            stackId="a"
            fill="var(--color-reoccuring)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

const chartConfig = {
  oneTime: {
    label: "One time",
    color: "hsl(var(--chart-1))",
  },
  reoccuring: {
    label: "Recurring",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;
