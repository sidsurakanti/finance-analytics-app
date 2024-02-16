import { fetchCashflows, fetchTransactionsThisMonth } from "@lib/data";
import type { User, Cashflow, Transaction } from "@lib/definitions";
import { CashflowCard } from "@components/cashflows/CashflowCard";
import { EditCashflows } from "@components/cashflows/EditCashflows";
import { auth } from "@/auth";
import { CashflowsOnboarding } from "@components/cashflows/CashflowsOnboarding";

export async function CashflowList() {
  const session = await auth();
  const user = session?.user as User;

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

  // TODO: add a card to show remaining balance
  // ? maybe add an option to add this balance to savings
  // * fetch data for cashflow cards
  const transactionsThisMonth: Transaction[] =
    await fetchTransactionsThisMonth(user);

  // filter transactions into reoccuring and one-time expenses
  const reoccuring: Transaction[] = transactionsThisMonth.filter(
    (t) => t.type === "reoccuring",
  )
  const expenses: Transaction[] = transactionsThisMonth.filter(
    (t) => t.type !== "reoccuring",
  );

  // calculate totals
  // * abs these values because they're negative because expense transactions are negative
  const reoccuringTotal: string = reoccuring
    .reduce((a, b) => a + Math.abs(Number(b.amount)), 0)
    .toFixed(2);
  const expensesTotal: string = expenses
    .reduce((a, b) => a + Math.abs(Number(b.amount)), 0)
    .toFixed(2);

  // calculate remaining balance
  const remainingBalance: string = (
    Number(cashflows.income) -
    Number(expensesTotal) -
    Number(reoccuringTotal)
  ).toFixed(2);

  // calculate percentages of expenses, reoccuring, and balance
  const expensesPercentage: number =
    (Number(expensesTotal) / Number(cashflows.income)) * 100;
  const reoccuringPercentage: number =
    (Number(reoccuringTotal) / Number(cashflows.income)) * 100;
  // TODO: add a card to show remaining balance
  const remainingBalancePercentage: number =
    (Number(remainingBalance) / Number(cashflows.income)) * 100;

  return (
    <>
      {/* open a sheet that shows a form to edit cashflows */}
      <EditCashflows />

      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 justify-between gap-3">
        <div className="flex flex-col gap-3">
          <CashflowCard
            title="Income"
            value={cashflows.income}
            percentage={100}
            badge={"monthly"}
            insideText={true}
          />
          <CashflowCard
            title="Savings"
            value={cashflows.savings}
            insideText={false}
          />
        </div>

        <div className="flex flex-col gap-3">
          <CashflowCard
            title="Expenses"
            value={expensesTotal}
            badge={"this month"}
            percentage={expensesPercentage}
            insideText={true}
          />
          <CashflowCard
            title="Reoccuring"
            percentage={reoccuringPercentage}
            value={reoccuringTotal}
            insideText={true}
          />
        </div>
      </div>
    </>
  );
}
