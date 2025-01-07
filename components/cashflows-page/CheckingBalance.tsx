import { Balance } from "@/lib/definitions";
import { cashFormatter, dateFormatter, cn } from "@/lib/utils";
import { BalanceChart } from "@/components/cashflows/BalanceChart";
import { inter } from "@/styles/fonts";
import { nextPaycheckDetailsT } from "@/components/cashflows-page/CashflowCards";

interface CheckingBalanceProps {
  balance: Balance;
  paycheckDetails: nextPaycheckDetailsT;
}

export default function CheckingBalance({
  balance,
  paycheckDetails
}: CheckingBalanceProps) {
  return (
    <section className="flex justify-between items-center gap-3 rounded-xl p-4 bg-accent shadow-md border border-border">
      <div className="flex flex-col gap-5">
        <h1 className="text-lg">Checking balance</h1>

        <span className="flex flex-col gap-3">
          <p
            className={cn(
              inter.className,
              "text-3xl md:text-4xl xl:text-[42px] 2xl:text-[55px] flex items-end gap-0.5 font-medium",
            )}
          >
            {cashFormatter(Number(balance.amount))}
          </p>
          <div className="text-sm bg-[#BAEBC7] text-[#0a7551] dark:bg-[#0a7551] dark:text-[#c2ebcd] w-fit py-2 px-4 rounded-xl">
            <span className="font-medium">
              {cashFormatter(Number(paycheckDetails.income_amt))}
            </span> {" "}
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
