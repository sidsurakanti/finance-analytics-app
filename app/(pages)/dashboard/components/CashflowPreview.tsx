import type { Cashflow, User } from "@lib/definitions";
import { CashflowCard } from "@/(pages)/cashflows/components/CashflowCard";
import { fetchCashflows, fetchTransactionsThisMonth } from "@lib/data";

type Props = {
  user: User;
};

export default async function CashflowPreview({ user }: Props) {
  const cashflows = await fetchCashflows(user);
  const transactionsThisMonth = await fetchTransactionsThisMonth(user);
  const thisMonthTotal = transactionsThisMonth
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section className="w-1/5 h-full flex xl:flex-col gap-5 px-5 justify-start">
      <CashflowCard title="This month" value={thisMonthTotal} />
      <CashflowCard title="Savings" value={cashflows.savings} />
      <CashflowCard title="Income" value={cashflows.income} />
    </section>
  );
}
