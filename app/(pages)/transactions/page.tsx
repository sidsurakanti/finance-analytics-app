import { auth } from "@/auth";
import { User } from "@/lib/definitions";
import TransactionList from "@components/transactions/TransactionList";
import Link from "next/link";
import { Suspense } from "react";

// Server component
export default async function Transactions() {
  const session = await auth();
  const user = session?.user as User;

  return (
    <main className="bg-green-200 text-black">
      <Link className="text-blue-500" href="/transactions/create">
        add transaction
      </Link>
      <Suspense fallback={"Loading transactions..."}>
        <TransactionList user={user} />
      </Suspense>
    </main>
  );
}
