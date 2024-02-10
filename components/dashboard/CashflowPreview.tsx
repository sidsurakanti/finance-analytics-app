import type { Transaction, User } from "@lib/definitions";
import { CashflowCard } from "@components/cashflows/CashflowCard";
import { fetchCashflows, fetchTransactionsThisMonth } from "@lib/data";
import { Button } from "@components/ui/button";
import Link from "next/link";

type Props = {
  user: User;
};

export async function CashflowPreview({ user }: Props) {
  const cashflows = await fetchCashflows(user);

  const transactionsThisMonth: Transaction[] =
    await fetchTransactionsThisMonth(user);
  const thisMonthTotal: string = transactionsThisMonth
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section className="bg-red-400">
      {!(cashflows == undefined) && (
        <div>
          <CashflowCard title="This month" value={thisMonthTotal} />
          <CashflowCard title="Savings" value={cashflows.savings} />
          <CashflowCard title="Income" value={cashflows.income} />
        </div>
      )}
      {cashflows == undefined && (
        <div>
          <p>You don't have any cashflows yet, start by adding some</p>
          <Link href="/cashflows/edit">
            <Button>Go</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
