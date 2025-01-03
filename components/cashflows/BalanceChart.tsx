import { fetchRecentBalances } from "@lib/data";
import { Balance } from "@lib/definitions";
import { SparkAreaChart } from "@tremor/react";

export async function BalanceChart({ user_id, color, chartLimit, className }: { user_id: string, color: "sky" | "emerald", chartLimit?: number, className?: string}) {
  const balances: Balance[] = await fetchRecentBalances(user_id, chartLimit);
  return (
    <>
      <SparkAreaChart
        data={balances}
        categories={["amount"]}
        index={"id"}
        colors={[color,]}
        curveType="monotone"
        className={className}
      />
    </>
  );
}