import { fetchUser } from "@lib/data";
import TransactionList from "@components/transactions/TransactionList";
import Link from "next/link";
import { Suspense } from "react";

// Server component
export default async function Transactions() {
  const user = await fetchUser("janedoe@gmail.com");

  return (
    <main className="bg-green-500">
      <Link className="text-blue-500" href="/transactions/create">
        add transaction
      </Link>
      <Suspense fallback={"Loading transactions..."}>
        <TransactionList user={user} />
      </Suspense>
    </main>
  );
}
