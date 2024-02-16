import { fetchRecentBalances } from "@lib/data";
import { Balance } from "@lib/definitions";
import { SparkAreaChart } from "@tremor/react";

export async function BalanceChart({ user_id }: { user_id: string }) {
  const balances: Balance[] = await fetchRecentBalances(user_id);
  console.log(balances);

  return (
    <>
      <SparkAreaChart
        data={balances}
        categories={["amount"]}
        index={"id"}
        colors={["sky"]}
      />
    </>
  );
}
