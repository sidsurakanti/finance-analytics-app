import { auth } from "@/auth";
import { User } from "@/lib/definitions";
import TransactionList from "@components/transactions/TransactionList";
import { Suspense } from "react";
import { Skeleton } from "@components/ui/skeleton";
import { TransactionSheet } from "@components/transactions/CreateTransaction";
import { fetchReoccuring } from "@lib/data";

// Server component
export default async function Transactions() {
  const session = await auth();
  const user = session?.user as User;

  // fetch reoccuring transactions to pass to the CreateTransactionForm
  // we need this for when the user is creating a transactions thats also a reoccuring transaction
  const reoccuring = await fetchReoccuring(user);

  return (
    <main className="w-[90%] md:w-5/6 lg:w-4/5 xl:w-3/4 h-[90%] mx-auto flex flex-col gap-3">
      <div>
        <TransactionSheet user={user} reoccuring={reoccuring} />
      </div>
      <div className="mb-4">
        <Suspense
          fallback={<Skeleton className="h-[700px] rounded-xl w-full" />}
        >
          <TransactionList user={user} />
        </Suspense>
      </div>
    </main>
  );
}
