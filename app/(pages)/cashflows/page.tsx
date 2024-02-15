import { CashflowChart } from "@/components/cashflows/CashflowChart";
import { CashflowList } from "@/components/cashflows/CashflowList";
import { ReoccuringPreview } from "@/components/cashflows/ReoccuringPreview";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Cashflows() {
  return (
    <main className="w-[90%] h-[90%] md:w-5/6 mx-auto">
      <section className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-4">
          <Suspense fallback={<Skeleton className="w-full" />}>
            <CashflowList />
          </Suspense>
          <ReoccuringPreview />
        </div>

        <div className="gap-4">
          <Suspense fallback={<Skeleton className="w-full" />}>
            <CashflowChart />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
