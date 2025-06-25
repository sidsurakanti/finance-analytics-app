import type { Balance } from "@/lib/definitions";
import type { nextPaycheckDetailsT } from "@/components/cashflows/CashflowCards";
import { cashFormatter, dateFormatter, cn } from "@/lib/utils";
import { mono } from "@/styles/fonts";

import BalanceChart from "@/components/cashflows/balance/BalanceChart";
import UpdateBalanceButton from "@/components/cashflows/balance/UpdateBalance";

interface CheckingBalanceProps {
  balance: Balance;
  paycheckDetails: nextPaycheckDetailsT | undefined;
}

export default function CheckingBalanceCard({
  balance,
  paycheckDetails,
}: CheckingBalanceProps) {
  return (
    <section className="group h-48 flex justify-between items-center p-4 gap-3 rounded-xl bg-gradient-to-b from-[#FAFAFA] to-[#f3f3f3] dark:from-[#171717] dark:to-[#121212] shadow-md border border-border">
      <div className="h-full flex flex-col justify-between gap-5">
        <span className="flex gap-4 items-center">
          <h1 className="text-xs sm:text-base">Checking balance</h1>
          <UpdateBalanceButton
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
            {cashFormatter(Number(balance.amount), false)}
          </span>
          {paycheckDetails && (
            <div className="text-xs sm:text-sm text-emerald-800 bg-emerald-200 hover:bg-emerald-300/65 transition-colors cursor-pointer w-fit py-2 px-3 rounded-xl">
              <span
                className={cn(mono.className, "font-medium tracking-tight")}
              >
                {cashFormatter(Number(paycheckDetails.income_amt))}
              </span>{" "}
              landing on {dateFormatter(paycheckDetails.nextPayDate)} (
              {paycheckDetails.name})
            </div>
          )}
        </span>
      </div>

      <BalanceChart
        user_id={balance.user_id}
        color={"emerald"}
        chartLimit={15}
        className="h-32 w-5/12 xl:w-64 lg:w-52"
      />
    </section>
  );
}
