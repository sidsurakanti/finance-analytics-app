import type { Balance } from "@/lib/definitions";
import { fetchRecentBalances } from "@lib/data";
import { SparkAreaChart } from "@tremor/react";

export default async function BalanceChart({
  user_id,
  color,
  chartLimit,
  className,
}: {
  user_id: string;
  color: "sky" | "emerald";
  chartLimit?: number;
  className?: string;
}) {
  const balances: Balance[] = await fetchRecentBalances(user_id, chartLimit);
  const balAmt: number[] = balances.map((balance) => Number(balance.amount));
  const maxBal: number = Math.max(...balAmt);
  const minBal: number = Math.min(...balAmt);

  return (
    <>
      <SparkAreaChart
        data={balances}
        categories={["amount"]}
        index={"id"}
        colors={[color]}
        curveType="monotone"
        className={className}
        minValue={minBal - minBal / 5}
        maxValue={maxBal + maxBal / 10}
      />
    </>
  );
}
