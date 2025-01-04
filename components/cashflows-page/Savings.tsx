import { Cashflow } from "@/lib/definitions";
import { inter } from "@/styles/fonts";
import { cn, cashFormatter } from "@/lib/utils";
import { BalanceChart } from "@/components/cashflows/BalanceChart";

export default function Savings({ cashflows }: { cashflows: Cashflow }) {
  return (
    <section className="flex justify-between gap-3 rounded-xl p-6 bg-transparent shadow-md border broder-border">
      <div className="flex flex-col justify-between gap-5">
        <h1 className="text-lg">Savings</h1>
        <span className="flex flex-col gap-3">
          <p
            className={cn(
              inter.className,
              "text-3xl md:text-4xl xl:text-[42px] 2xl:text-[55px] flex items-end gap-0.5 font-medium",
            )}
          >
            {cashFormatter(Number(cashflows.savings))}
          </p>
        </span>
      </div>
      
      {/* // TODO: replace w savings chart once we have a savings table in db */}
      <BalanceChart user_id={cashflows.user_id} color={"emerald"} chartLimit={15} className="h-32 w-64"/>
    </section>
  )
}