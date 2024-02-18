import { Suspense } from "react";
import { auth } from "@/auth";

import { fetchReoccuring } from "@lib/data";
import { type User } from "@lib/definitions";

import TransactionList from "@components/transactions/TransactionList";
import { Skeleton } from "@components/ui/skeleton";
import { TransactionSheet } from "@components/transactions/CreateTransaction";


// server component
export default async function Transactions() {
  const session = await auth();
  const user = session?.user as User;

  // fetch reoccuring transactions to pass to the CreateTransactionForm
  // we need this for when the user is creating a transactions thats also a reoccuring transaction
  const reoccuring = await fetchReoccuring(user);

  return (
    <main className="h-[90%] w-[90%] md:w-5/6 xl:w-4/5 mx-auto flex flex-col gap-3">
      <span>
        <TransactionSheet user={user} reoccuring={reoccuring} />
      </span>

      <section className="mb-5">
        <Suspense
          fallback={<Skeleton className="h-[700px] rounded-xl w-full" />}
        >
          <TransactionList user={user} />
        </Suspense>
      </section>
    </main>
  );
}
