import type { Transaction, User } from "@lib/definitions";
import { CashflowCard } from "@components/cashflows/CashflowCard";
import { fetchCashflows, fetchTransactionsThisMonth } from "@lib/data";
import { CashflowsOnboarding } from "@components/cashflows/CashflowsOnboarding";
import { Wrapper } from "@components/cashflows/CashflowWrapper";

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
    <section className="flex flex-col md:flex-row xl:flex-col justify-between gap-3 xl:justify-end">
      <CashflowCard title="This month" value={thisMonthTotal} />
      {cashflows && (
        <Wrapper viewMore>
          <CashflowCard title="Income" value={cashflows.income} />
          <CashflowCard title="Savings" value={cashflows.savings} />
        </Wrapper>
      )}

      {!cashflows && (
        <div className="bg-accent w-full p-4 rounded-lg text-lg flex flex-col gap-2">
          <span>
            You don&apos;t have any cashflows yet, get started by adding some.
          </span>
          <CashflowsOnboarding user={user} />
        </div>
      )}
    </section>
  );
}
