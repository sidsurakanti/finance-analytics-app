import { fetchCashflows, fetchTransactionsThisMonth } from "@lib/data";
import type { User, Cashflow, Transaction } from "@lib/definitions";
import { CashflowCard } from "@components/cashflows/CashflowCard";
import { Wrapper } from "@components/cashflows/CashflowWrapper";
import { auth } from "@/auth";
import { CashflowsOnboarding } from "@components/cashflows/CashflowsOnboarding";

export async function CashflowList() {
  const session = await auth();
  const user = session?.user as User;

  const cashflows: Cashflow = await fetchCashflows(user);

  const transactionsThisMonth: Transaction[] =
    await fetchTransactionsThisMonth(user);
  const thisMonthTotal: string = transactionsThisMonth
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section>
      {!(cashflows == undefined) && (
        <div>
          {/* // TODO: find a more efficient way to do this */}
          <Wrapper editText>
            <CashflowCard title="This month" value={thisMonthTotal} />
            <div className="h-full flex flex-col md:flex-row xl:flex-col justify-between gap-3">
              <CashflowCard title="Income" value={cashflows.income} />
              <CashflowCard title="Savings" value={cashflows.savings} />
            </div>
          </Wrapper>
        </div>
      )}
      {cashflows == undefined && (
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
