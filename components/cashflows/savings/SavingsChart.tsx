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

  return (
    <>
      <SparkAreaChart
        data={savings}
        categories={["amount"]}
        index={"id"}
        colors={[color]}
        curveType="monotone"
        className={className}
      />
    </>
  );
}
