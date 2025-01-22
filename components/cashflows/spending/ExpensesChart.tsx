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
import { dateFormatter, cashFormatter, cn } from "@/lib/utils";
import { mono } from "@/styles/fonts";
import { SortedData } from "@/lib/data";
import { Dispatch, SetStateAction } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ExpensesChart({
  expenses,
  recurring,
  paychecks,
  handleTimespanChange,
}: {
  expenses: SortedData[] | undefined;
  recurring: SortedData[] | undefined;
  paychecks: SortedData[] | undefined;
  handleTimespanChange: Dispatch<
    SetStateAction<"6 months" | "1 year" | "3 months">
  >;
}) {
  if (!expenses || !recurring || !paychecks) {
    return <Skeleton className="h-96 w-full bg-neutral-200" />;
  }

  const expensesF = expenses.map((expense) => ({
    ...expense,
    total_amount: Math.abs(Number(expense.total_amount)),
  }));
  const recurringF = recurring.map((recurring) => ({
    ...recurring,
    total_amount: Math.abs(Number(recurring.total_amount)),
  }));
  const paychecksF = paychecks.map((paycheck) => ({
    ...paycheck,
    total_amount: Math.abs(Number(paycheck.total_amount)),
  }));

  let data: Array<{
    month: Date;
    recurring: number;
    oneTime: number;
    income: number;
  }> = [];

  for (let i = 0; i < expensesF.length; i++) {
    data.push({
      month: new Date(expensesF[i].month.getTime() + 86400000), // add one day in milliseconds
      oneTime: expensesF[i].total_amount,
      recurring: recurringF[i].total_amount,
      income: paychecksF[i].total_amount,
    });
  }

  const totalSpending: number = data.reduce(
    (acc, curr) => acc + curr.oneTime + curr.recurring,
    0,
  );

  return (
    <div className="bg-gradient-to-b from-[#FAFAFA] to-[#f1f1f1] dark:from-[#171717] dark:to-[#121212] flex flex-col gap-8 rounded-xl p-4 shadow-md border border-border">
      <h1 className="">Total spending</h1>
      <span className="flex justify-between items-end gap-5">
        <span
          className={cn(
            mono.className,
            "tracking-tighter text-3xl md:text-4xl xl:text-[42px] 2xl:text-[55px] flex items-start gap-0.5",
          )}
        >
          <p className="text-2xl">$</p>
          {cashFormatter(Number(totalSpending), false)}
        </span>
        <Select
          onValueChange={(value: "6 months" | "1 year" | "3 months") =>
            handleTimespanChange(value)
          }
        >
          <SelectTrigger className="max-w-fit space-x-2.5">
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
            dataKey="income"
            stackId="a"
            fill="var(--color-income)"
            radius={4}
          />
          <Bar
            dataKey="oneTime"
            stackId="b"
            fill="var(--color-oneTime)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="recurring"
            stackId="b"
            fill="var(--color-recurring)"
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
    color: "hsl(var(--chart-4))",
  },
  recurring: {
    label: "Recurring",
    color: "hsl(var(--chart-5))",
  },
  income: {
    label: "Income",
    color: "#10b981",
  },
} satisfies ChartConfig;
