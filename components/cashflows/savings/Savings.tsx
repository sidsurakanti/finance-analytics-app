import type { Savings } from "@/lib/definitions";
import { inter, mono } from "@/styles/fonts";
import { cn, cashFormatter } from "@/lib/utils";
import { SavingsChart } from "@/components/cashflows/savings/SavingsChart";
import UpdateSavingsButton from "@/components/cashflows/savings/UpdateSavings";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function SavingsCard({
  savingsDetails,
}: {
  savingsDetails: { savings: Savings; change: number };
}) {
  const { savings, change } = savingsDetails;

  return (
    <section className="h-48 group flex justify-between gap-3 rounded-xl p-4 bg-gradient-to-b from-[#FAFAFA] to-[#f3f3f3] dark:from-[#171717] dark:to-[#121212] shadow-md border border-border">
      <div className="flex flex-col justify-between">
        <span className="flex gap-4 items-center">
          <h1 className="text-md">Savings</h1>
          <UpdateSavingsButton
            savings={savings}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-0 h-fit text-black dark:text-white"
          />
        </span>

        <span className="flex flex-col gap-3">
          <p
            className={cn(
              mono.className,
              "tracking-tighter text-3xl md:text-4xl xl:text-[42px] 2xl:text-[55px] flex items-end gap-0.5",
            )}
          >
            {cashFormatter(Number(savings.amount))}
          </p>
          <p
            className={cn(
              mono.className,
              change > 0
                ? "text-sky-800 bg-sky-200 hover:bg-sky-300/65"
                : "text-red-500 hover:bg-red-200/75 bg-red-100",
              "tracking-tight flex w-fit items-center gap-1.5 text-sm font-medium rounded-xl py-2 px-3 transition-colors cursor-pointer",
            )}
          >
            {change > 0 ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
            {cashFormatter(change)}
          </p>
        </span>
      </div>

      <SavingsChart
        user_id={savings.user_id}
        color={"sky"}
        className="h-32 w-64"
      />
    </section>
  );
}
