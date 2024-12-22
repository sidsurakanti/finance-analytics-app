import { CashflowChart } from "@components/cashflows/CashflowChart";
import { CashflowList } from "@components/cashflows/CashflowList";
import { ReoccuringPreview } from "@components/cashflows/ReoccuringPreview";
import { TransactionsPreview } from "@components/cashflows/TransactionsPreview";
import { EditCashflows } from "@components/cashflows/EditCashflows";
import { Skeleton } from "@components/ui/skeleton";

import { Suspense } from "react";

export default async function Dashboard() {
  return (
    <main className="h-full w-[90%] md:w-[85%] 2xl:w-4/5 mx-auto">
      <section className="mt-2 mb-4 flex justify-between items-end">
        <h1 className="text-5xl md:text-6xl font-bold">Dashboard</h1>
        {/* opens a sheet that shows a form to edit cashflows */}
        <EditCashflows />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-3 pb-5">
        <div className="xl:col-span-2 space-y-4 ">
          <Suspense fallback={<Skeleton className="w-full" />}>
            <CashflowList />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 col-span-2 gap-3">
          <div className="col-span-3 flex flex-col gap-3">
            <Suspense fallback={<Skeleton className="w-full" />}>
              <TransactionsPreview />
              <ReoccuringPreview />
            </Suspense>
          </div>

          <div className="col-span-2">
            <Suspense fallback={<Skeleton className="w-full" />}>
              <CashflowChart />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
