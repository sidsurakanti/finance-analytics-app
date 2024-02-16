import { CashflowChart } from "@/components/cashflows/CashflowChart";
import { CashflowList } from "@/components/cashflows/CashflowList";
import { ReoccuringPreview } from "@/components/cashflows/ReoccuringPreview";
import { TransactionsPreview } from "@/components/dashboard/TransactionsPreview";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Cashflows() {
  return (
    <main className="w-[90%] md:w-5/6 lg:w-4/5 xl:w-2/3 h-[90%] mx-auto">
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-5 pb-10">
        <div className="col-span-2 space-y-4 ">
          <Suspense fallback={<Skeleton className="w-full" />}>
            <CashflowList />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 col-span-2 gap-5">
          <div className="flex flex-col gap-5">
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
