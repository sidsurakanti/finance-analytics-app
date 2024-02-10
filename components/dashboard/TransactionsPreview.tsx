import type { User } from "@lib/definitions";
import { fetchTransactions } from "@lib/data";
import { RecentTransactions } from "@components/dashboard/RecentTransactions";
import Link from "next/link";

interface Props {
  user: User;
}

export async function TransactionSection({ user }: Props) {
  const transactions = await fetchTransactions(user);
  const recentTotal = transactions
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section className="bg-green-200">
      <p>Recent</p>
      <p>${recentTotal}</p>
      <Link className="text-blue-500" href="/transactions/create">
        add transaction
      </Link>

      <RecentTransactions transactions={transactions} />
    </section>
  );
}
