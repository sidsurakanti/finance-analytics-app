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
    <section className="bg-accent/70 text-secondary-foreground border border-border rounded-lg p-5 flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-secondary-foreground/50">Recent</p>
          <span className="text-4xl flex flex-row gap-[2px]">
            <div className="text-muted-foreground">$</div>
            {recentTotal}
          </span>
        </div>
        <Link className="" href="/transactions/create">
          <Button>add transaction</Button>
        </Link>
      </div>

      <RecentTransactions transactions={transactions} />
    </section>
  );
}
