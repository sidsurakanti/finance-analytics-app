import type { Transaction, User } from "@lib/definitions";
import { CashflowCard } from "@components/cashflows/CashflowCard";
import { fetchCashflows, fetchTransactionsThisMonth } from "@lib/data";

type Props = {
  user: User,
};

export async function CashflowPreview({ user }: Props) {
  const { savings, income } = await fetchCashflows(user);
  const transactionsThisMonth: Transaction[] =
    await fetchTransactionsThisMonth(user);
  const thisMonthTotal: string = transactionsThisMonth
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section className="bg-red-400">
      <CashflowCard title="This month" value={thisMonthTotal} />
      <CashflowCard title="Savings" value={savings} />
      <CashflowCard title="Income" value={income} />
    </section>
  );
}
