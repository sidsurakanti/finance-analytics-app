import { CashflowChart } from "@/components/cashflows/CashflowChart";
import { CashflowList } from "@/components/cashflows/CashflowList";
import { ReoccuringPreview } from "@/components/cashflows/ReoccuringPreview";
import { TransactionsPreview } from "@/components/cashflows/TransactionsPreview";
import { EditCashflows } from "@components/cashflows/EditCashflows";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Dashboard() {
  return (
    <main className="w-[90%] md:w-5/6 lg:w-4/5 xl:w-3/4 h-[90%] mx-auto">
      <span className="flex justify-between py-6 items-end">
        <h1 className="text-6xl font-bold">Dashboard</h1>
        <p>
          {/* opens a sheet that shows a form to edit cashflows */}
          <EditCashflows />
        </p>
      </span>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-3 pb-5">
        <div className="col-span-2 space-y-4 ">
          <Suspense fallback={<Skeleton className="w-full" />}>
            <CashflowList />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 col-span-2 gap-3">
          <div className="flex flex-col gap-3">
            <Suspense fallback={<Skeleton className="w-full" />}>
              <TransactionsPreview />
              <ReoccuringPreview />
            </Suspense>
          </div>

          <Suspense fallback={<Skeleton className="w-full" />}>
            <CashflowChart />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
