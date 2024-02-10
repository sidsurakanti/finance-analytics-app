import { fetchUser } from "@lib/data";

import { TransactionSection } from "@components/dashboard/TransactionsPreview";
import { CashflowPreview } from "@components/dashboard/CashflowPreview";
import { Suspense } from "react";

export default async function Dashboard() {
  const user = await fetchUser("janedoe@gmail.com");

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
