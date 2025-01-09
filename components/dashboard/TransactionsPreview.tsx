import type { User } from "@lib/definitions";
import { fetchTransactions } from "@lib/data";

import { RecentTransactionsList } from "@components/dashboard/RecentTransactionsList";
import { Button } from "@components/ui/button";
import { ViewMore } from "@components/ui/icons";

import { auth } from "@/auth";
import Link from "next/link";

export async function TransactionsPreview() {
  const session = await auth();
  const user = session?.user as User;
  const transactions = await fetchTransactions(user);

  // const recentTotal = transactions
  //   .reduce((a, b) => a + Number(b.amount), 0)
  //   .toFixed(2);

  return (
    <section className="bg-accent/75 text-foreground border border-border rounded-lg p-5 flex flex-col gap-5 shadow-md">
      <header className="flex justify-between items-center">
        <p className="text-muted-foreground tracking-wide text-md xl:text-lg">
          Recent transactions
        </p>

        <span>
          <Link href="/transactions">
            <Button>
              <p className="hidden md:block">view all</p>
              <ViewMore className="md:hidden" height={17} width={17} />
            </Button>
          </Link>
        </span>
      </header>

      <RecentTransactionsList transactions={transactions} />
    </section>
  );
}
