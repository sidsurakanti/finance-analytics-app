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
  );
  const expenses: Transaction[] = transactionsThisMonth.filter(
    (t) => t.type !== "reoccuring",
  );

  // calculate totals
  const reoccuringTotal: string = reoccuring
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);
  const expensesTotal: string = expenses
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <>
      {/* open a sheet that shows a form to edit cashflows */}
      <EditCashflows />

      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 justify-between gap-3 mt-4">
        <div className="flex flex-col gap-3">
          <CashflowCard
            title="Income"
            value={cashflows.income}
            badge={"monthly"}
          />
          <CashflowCard title="Savings" value={cashflows.savings} />
        </div>

        <div className="flex flex-col gap-3">
          <CashflowCard
            title="Expenses"
            value={expensesTotal}
            badge={"this month"}
          />
          <CashflowCard title="Reoccuring" value={reoccuringTotal} />
        </div>
      </div>
    </>
  );
}
