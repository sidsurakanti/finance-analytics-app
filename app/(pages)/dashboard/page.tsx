import { auth } from "@/auth";

import { TransactionSection } from "@components/dashboard/TransactionsPreview";
import { CashflowPreview } from "@components/dashboard/CashflowPreview";
import { Suspense } from "react";
import { User } from "@/lib/definitions";

export default async function Dashboard() {
  const session = await auth();
  // * we know that session.user is a user type since 
  // * they would have been redirected to the login page if they weren't logged in
  const user = session?.user as User;

  return (
    <main>
      <Suspense fallback={"Loading cashflows..."}>
        <CashflowPreview user={user} />
      </Suspense>
      <Suspense fallback={"Loading transactions..."}>
        <TransactionSection user={user} />
      </Suspense>
    </main>
  );
}
