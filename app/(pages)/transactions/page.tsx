import { auth } from "@/auth";
import { User } from "@/lib/definitions";
import TransactionList from "@components/transactions/TransactionList";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionSheet } from "@/components/transactions/CreateTransaction";

// Server component
export default async function Transactions() {
  const session = await auth();
  const user = session?.user as User;

  return (
    <main className="w-[90%] md:w-5/6 mx-auto flex flex-col gap-2">
      <div className="flex justify-end">
        <TransactionSheet user={user} />
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
