import type { Balance, Savings, User } from "@/lib/definitions";
import { inter, mono } from "@/styles/fonts";
import { cn, cashFormatter } from "@/lib/utils";
import { SavingsChart } from "@/components/cashflows/savings/SavingsChart";
import UpdateSavingsButton from "@/components/cashflows/savings/UpdateSavings";
import { TrendingUp, TrendingDown } from "lucide-react";
import { fetchBalance, fetchCurrSavings } from "@/lib/data";

export default async function SavingsCard({ user }: { user: User }) {
  const savingsDetails: { savings: Savings; change: number } =
    await fetchCurrSavings(user.id);
  const { savings, change } = savingsDetails;
  const balance: Balance = await fetchBalance(user.id);

  return (
    <section className="h-48 group flex justify-between gap-3 rounded-xl p-4 bg-gradient-to-b from-[#FAFAFA] to-[#f3f3f3] dark:from-[#171717] dark:to-[#121212] shadow-md border border-border">
      <div className="flex flex-col justify-between">
        <span className="flex gap-4 items-center">
          <h1 className="text-md">Savings</h1>
          <UpdateSavingsButton
            savings={savings}
            balance={balance}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-0 h-fit text-black dark:text-white"
          />
        </span>

        <span className="flex flex-col gap-3">
          <span
            className={cn(
              mono.className,
              "tracking-tighter text-3xl md:text-4xl xl:text-[42px] 2xl:text-[55px] flex items-start gap-0.5",
            )}
          >
            <p className="text-2xl">$</p>
            {cashFormatter(Number(savings.amount), false)}
          </span>
          <p
            className={cn(
              mono.className,
              change > 0
                ? "text-sky-800 bg-sky-200 hover:bg-sky-300/65"
                : "text-red-500 hover:bg-red-200/75 bg-red-100",
              "tracking-tight flex w-fit items-center gap-2 text-sm font-medium rounded-xl py-2 md:mt-0.5 px-3 transition-colors cursor-pointer",
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
        className="h-32 lg:w-52 xl:w-64"
      />
    </section>
  );
}
