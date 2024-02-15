import { CashflowChart } from "@/components/cashflows/CashflowChart";
import { CashflowList } from "@/components/cashflows/CashflowList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Cashflows() {
  return (
    <main className="w-[90%] h-[90%] md:w-5/6 mx-auto">
      <section className="grid grid-cols-1 gap-10">
        <div className="h-fit">
          <Suspense fallback={<Skeleton className="w-full" />}>
            <CashflowList />
          </Suspense>
        </div>

        <div className="grid xl:grid-cols-5 gap-4">
          <Suspense fallback={<Skeleton className="w-full" />}>
            <CashflowChart />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
