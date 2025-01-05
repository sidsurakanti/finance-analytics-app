import { Cashflow, Savings } from "@/lib/definitions";
import { inter } from "@/styles/fonts";
import { cn, cashFormatter } from "@/lib/utils";
// import { Savings } from "@/components/cashflows/BalaChart";
import { SavingsChart } from "@/components/cashflows-page/SavingsChart";
import UpdateSavingsButton from "@/components/cashflows-page/UpdateSavings";

export default function SavingsCard({
  savingsDetails,
}: {
  savingsDetails: { savings: Savings; change: number };
}) {
  const { savings, change } = savingsDetails;

  return (
    <section className="flex justify-between gap-3 rounded-xl p-6 bg-accent shadow-md border broder-border">
      <div className="flex flex-col justify-between gap-5">
        <span>
          <h1 className="text-lg">Savings</h1>
          <UpdateSavingsButton savings={savings} />
        </span>
        <span className="flex flex-col gap-3">
          <p
            className={cn(
              inter.className,
              "text-3xl md:text-4xl xl:text-[42px] 2xl:text-[55px] flex items-end gap-0.5 font-medium",
            )}
          >
            {/* {cashFormatter(Number(cashflows.savings))} */}
            {cashFormatter(Number(savings.amount))}
          </p>
          <p className={cn(change > 0 ? "text-emerald-600" : "text-red-500", "text-lg")}>
            {change > 0 ? "+" : ""}{cashFormatter(change)}
          </p>
        </span>
      </div>

      {/* // TODO: replace w savings chart once we have a savings table in db */}
      <SavingsChart
        user_id={savings.user_id}
        color={"emerald"}
        className="h-32 w-64"
      />
    </section>
  );
}
