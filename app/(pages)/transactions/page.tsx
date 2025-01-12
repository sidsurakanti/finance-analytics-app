import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionList from "@/components/transactions/TransactionsList";

// server component
export default function Transactions() {
  return (
    <main className="w-[90%] md:w-[85%] 2xl:w-4/5 3xl:w-2/3 mx-auto">
      <section>
        <Suspense
          fallback={<Skeleton className="h-[700px] rounded-xl w-full" />}
        >
          <TransactionList />
        </Suspense>
      </section>
    </main>
  );
}
