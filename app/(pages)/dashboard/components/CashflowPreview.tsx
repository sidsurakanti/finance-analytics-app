import type { Cashflow, Transaction, User } from "@lib/definitions";
import { CashflowCard } from "@/(pages)/cashflows/components/CashflowCard";
import { fetchCashflows, fetchTransactionsThisMonth } from "@lib/data";

type Props = {
  user: User;
};

export default async function CashflowPreview({ user }: Props) {
  const cashflows: Cashflow = await fetchCashflows(user);
  const transactionsThisMonth: Transaction[] = await fetchTransactionsThisMonth(user);
  const thisMonthTotal: string = transactionsThisMonth
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section className="bg-red-400">
      <CashflowCard title="This month" value={thisMonthTotal} />
      <CashflowCard title="Savings" value={cashflows.savings} />
      <CashflowCard title="Income" value={cashflows.income} />
    </section>
  );
}
