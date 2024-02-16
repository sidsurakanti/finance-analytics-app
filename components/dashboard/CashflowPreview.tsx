import type { Cashflow, Transaction, User } from "@lib/definitions";
import {
  fetchBalance,
  fetchCashflows,
  fetchTransactionsThisMonth,
} from "@lib/data";
import { CashflowCard } from "@components/cashflows/CashflowCard";
import { CashflowsOnboarding } from "@components/cashflows/CashflowsOnboarding";
import { BalanceCard } from "@components/cashflows/BalanceCard";
import { months } from "@/lib/utils";

export async function CashflowPreview({ user }: { user: User }) {
  const cashflows: Cashflow = await fetchCashflows(user);

  // show onboarding component if user has no existing cashflows
  if (!cashflows) {
    return (
      <section className="bg-accent w-full p-4 rounded-lg text-lg flex flex-col gap-2">
        <p>
          You don&apos;t have any cashflows yet, get started by adding some.
        </p>
        <CashflowsOnboarding user={user} />
      </section>
    );
  }

  const transactionsThisMonth: Transaction[] =
    await fetchTransactionsThisMonth(user);

  // filter transactions into reoccuring and one-time expenses
  const reoccuring: Transaction[] = transactionsThisMonth.filter(
    (t) => t.type === "reoccuring",
  );
  const expenses: Transaction[] = transactionsThisMonth.filter(
    (t) => t.type !== "reoccuring",
  );

  // calculate totals
  // * abs because expense transactions are negative and we need these to be positive to make any sense
  const reoccuringTotal: string = reoccuring
    .reduce((a, b) => a + Math.abs(Number(b.amount)), 0)
    .toFixed(2);
  const expensesTotal: string = expenses
    .reduce((a, b) => a + Math.abs(Number(b.amount)), 0)
    .toFixed(2);

  // calculate remaining balance
  const balance = await fetchBalance(user.id);

  // calculate percentages of expenses, reoccuring, and balance
  const expensesPercentage: number =
    (Number(expensesTotal) / Number(cashflows.income)) * 100;
  const reoccuringPercentage: number =
    (Number(reoccuringTotal) / Number(cashflows.income)) * 100;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 xl:grid-cols-1 xl:grid-rows-2 justify-between gap-3">
        <div className="flex flex-col gap-3">
          <CashflowCard
            title="Expenses"
            value={expensesTotal}
            badge={months[new Date().getMonth()].toLowerCase()}
            percentage={expensesPercentage}
            insideText={true}
          />
          <CashflowCard
            title="Reoccuring"
            value={reoccuringTotal}
            badge={months[new Date().getMonth()].toLowerCase()}
            percentage={reoccuringPercentage}
            insideText={true}
          />
        </div>

        <div className="flex flex-col gap-3">
          <CashflowCard
            title="Income"
            percentage={100}
            value={cashflows.income}
            badge={"monthly"}
            insideText={false}
          />
          <BalanceCard
            title="Balance"
            value={balance.amount}
            user_id={user.id}
          />
        </div>
      </div>
    </>
  );
}
