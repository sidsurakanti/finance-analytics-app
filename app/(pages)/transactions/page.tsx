import { Suspense } from "react";
import { Skeleton } from "@components/ui/skeleton";
// import TransactionList from "@components/transactions/TransactionList";
import TransactionList from "@/components/transactions/TransactionsList2";

// server component
export default function Transactions() {
  return (
    <main className="h-full w-[90%] md:w-[85%] 2xl:w-4/5 mx-auto">
      <section className="mb-5">
        <Suspense
          fallback={<Skeleton className="h-[700px] rounded-xl w-full" />}
        >
          <TransactionList />
        </Suspense>
      </section>
    </main>
  );
}
