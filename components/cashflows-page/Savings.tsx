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
    <section className="group flex justify-between gap-3 rounded-xl px-6 py-4 bg-accent shadow-md border broder-border">
      <div className="flex flex-col justify-between gap-5">
        <span className="flex gap-4 items-center">
          <h1 className="text-lg">Savings</h1>
          <UpdateSavingsButton
            savings={savings}
            className="opacity-0 group-hover:opacity-100 transition-opacity "
          />
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
          <p
            className={cn(
              change > 0 ? "text-emerald-600" : "text-red-500",
              "text-lg",
            )}
          >
            {change > 0 ? "+" : ""}
            {cashFormatter(change)}
          </p>
        </span>
      </div>

      <SavingsChart
        user_id={savings.user_id}
        color={"emerald"}
        className="h-32 w-64"
      />
    </section>
  );
}
