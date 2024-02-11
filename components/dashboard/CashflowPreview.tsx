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
    <section className="h-full flex flex-col md:flex-row xl:flex-col justify-between gap-2 xl:justify-end">
      {cashflows && (
        <>
          <CashflowCard title="This month" value={thisMonthTotal} />
          <CashflowCard title="Savings" value={cashflows.savings} />
          <CashflowCard title="Income" value={cashflows.income} />
        </>
      )}

      {!cashflows && (
        <div>
          <p>You don&apos;t have any cashflows yet, start by adding some</p>
          <Button>
            <Link href="/cashflows/edit">Go</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
