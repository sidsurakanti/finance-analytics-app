import { CashflowList } from "@/components/cashflows/CashflowList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Cashflows() {
  return (
    <main className="w-[90%] md:w-5/6 mx-auto">
      <Suspense
        fallback={<Skeleton className="w-full h-[400px]"/>}
      >
        <CashflowList />
      </Suspense>
    </main>
  );
}
