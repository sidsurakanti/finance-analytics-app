import type { Balance } from "@/lib/definitions";
import { cashFormatter, dateFormatter, cn } from "@/lib/utils";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { mono } from "@/styles/fonts";
import { nextPaycheckDetailsT } from "@/components/cashflows/CashflowCards";

interface CheckingBalanceProps {
  balance: Balance;
  paycheckDetails: nextPaycheckDetailsT;
}

export default function CheckingBalance({
  balance,
  paycheckDetails,
}: CheckingBalanceProps) {
  return (
    <section className="h-48 flex justify-between items-center p-4 gap-3 rounded-xl bg-gradient-to-b from-[#FAFAFA] to-[#f3f3f3] dark:from-[#171717] dark:to-[#121212] shadow-md border border-border">
      <div className="h-full flex flex-col justify-between gap-5">
        <h1 className="">Checking balance</h1>

        <span className="flex flex-col gap-3">
          <p
            className={cn(
              mono.className,
              "tracking-tighter text-3xl md:text-4xl xl:text-[42px] 2xl:text-[55px] flex items-end gap-0.5",
            )}
          >
            {cashFormatter(Number(balance.amount))}
          </p>
          <div className="text-sm text-emerald-800 bg-emerald-200 hover:bg-emerald-300/65 transition-colors cursor-pointer w-fit py-2 px-3 rounded-xl">
            <span className={cn(mono.className, "font-medium tracking-tight")}>
              {cashFormatter(Number(paycheckDetails.income_amt))}
            </span>{" "}
            landing on {dateFormatter(paycheckDetails.nextPayDate)} (
            {paycheckDetails.name})
          </div>
        </span>
      </div>

      <BalanceChart
        user_id={balance.user_id}
        color={"emerald"}
        chartLimit={15}
        className="h-32 w-64"
      />
    </section>
  );
}
