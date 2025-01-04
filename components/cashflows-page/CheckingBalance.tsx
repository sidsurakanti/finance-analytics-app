import { Balance } from "@/lib/definitions";
import { cashFormatter, cn } from "@/lib/utils";
import { BalanceChart } from "@/components/cashflows/BalanceChart";
import { inter } from "@/styles/fonts";

interface CheckingBalanceProps {
  balance: Balance;
  nextPayCheck: string;
  paycheckAmt: string;
}

export default function CheckingBalance({
  balance,
  nextPayCheck,
  paycheckAmt,
}: CheckingBalanceProps) {
  return (
    <section className="flex justify-between items-center gap-3 rounded-xl p-6 bg-accent shadow-md border border-border">
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
          <div className="bg-[#BAEBC7] dark:bg-[#0a7551] w-fit py-2 px-4 rounded-xl">
            <span className="font-medium">
              {cashFormatter(Number(paycheckAmt))}
            </span>{" "}
            landing on {nextPayCheck}
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
