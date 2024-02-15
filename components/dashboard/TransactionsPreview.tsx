import type { User } from "@lib/definitions";
import { fetchTransactions } from "@lib/data";
import { RecentTransactions } from "@components/dashboard/RecentTransactions";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { ViewMore } from "@components/ui/icons";

interface Props {
  user: User;
}

export async function TransactionsPreview({ user }: Props) {
  const transactions = await fetchTransactions(user);
  const recentTotal = transactions
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section className="bg-accent/75 text-foreground border border-border rounded-lg p-5 flex flex-col gap-5 shadow-md">
      <header className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">Recent</p>
          <span className="text-4xl font-medium flex gap-0.5">
            <p className="text-muted-foreground">$</p>
            {recentTotal}
          </span>
        </div>

        <span>
          <Link href="/transactions">
            <Button>
              <p className="hidden md:block">view all</p>
              <ViewMore className="md:hidden" height={17} width={17} />
            </Button>
          </Link>
        </span>
      </header>

      <RecentTransactions transactions={transactions} />
    </section>
  );
}
