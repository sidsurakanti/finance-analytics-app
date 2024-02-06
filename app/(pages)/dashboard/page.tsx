import { fetchUser } from "@lib/data";

import TransactionSection from "@/(pages)/dashboard/components/TransactionsPreview";
import CashflowPreview from "@/(pages)/dashboard/components/CashflowPreview";

export default async function Dashboard() {
  const user = await fetchUser("janedoe@gmail.com");

  return (
    <main>
      <CashflowPreview user={user} />
      <TransactionSection user={user} />
    </main>
  );
}
