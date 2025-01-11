import { fetchRecentSavings } from "@lib/data";
import { Savings } from "@lib/definitions";
import { SparkAreaChart } from "@tremor/react";

export async function SavingsChart({
  user_id,
  color,
  className,
}: {
  user_id: number;
  color: "sky" | "emerald";
  className?: string;
}) {
  const savings: Savings[] = await fetchRecentSavings(user_id);
  const savingsAmt: number[] = savings.map((item) => Number(item.amount));
  const maxVal: number = Math.max(...savingsAmt);
  const minVal: number = Math.min(...savingsAmt);

  return (
    <>
      <SparkAreaChart
        data={savings}
        categories={["amount"]}
        index={"id"}
        colors={[color]}
        curveType="monotone"
        className={className}
        minValue={minVal - minVal / 5}
        maxValue={maxVal + maxVal / 10}
      />
    </>
  );
}
