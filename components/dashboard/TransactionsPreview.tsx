import type { User } from "@lib/definitions";
import { fetchTransactions } from "@lib/data";
import { RecentTransactions } from "@components/dashboard/RecentTransactions";
import Link from "next/link";
import { Button } from "@components/ui/button";

interface Props {
  user: User;
}

export async function TransactionSection({ user }: Props) {
  const transactions = await fetchTransactions(user);
  const recentTotal = transactions
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section className="bg-slate-400/75 rounded-lg p-5 text-black flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <span className="flex flex-col gap-[2px]">
          <p className="text-muted">Recent</p>
          <p className="text-3xl">${recentTotal}</p>
        </span>
        <Link className="" href="/transactions/create">
          <Button>add transaction</Button>
        </Link>
      </div>

      <RecentTransactions transactions={transactions} />
    </section>
  );
}
