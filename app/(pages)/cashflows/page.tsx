import { CashflowChart } from "@/components/cashflows/CashflowChart";
import { CashflowList } from "@/components/cashflows/CashflowList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Cashflows() {
  return (
    <main className="w-[90%] h-[90%] md:w-5/6 mx-auto grid grid-rows grid-cols-1 xl:grid-cols-3 gap-4">
      <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
        <CashflowList />
      </Suspense>
      <div className="flex justify-center xl:col-span-2">
        <CashflowChart />
      </div>
    </main>
  );
}
