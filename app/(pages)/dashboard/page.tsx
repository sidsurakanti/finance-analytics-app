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
    <main className="w-[90%] md:w-5/6 mx-auto grid grid-rows grid-cols-1 gap-10 xl:grid-cols-4">
      <div>
        <Suspense fallback={"Loading cashflows..."}>
          <CashflowPreview user={user} />
        </Suspense>
      </div>
      <div className="xl:col-span-3">
        <Suspense fallback={"Loading transactions..."}>
          <TransactionSection user={user} />
        </Suspense>
      </div>
    </main>
  );
}
