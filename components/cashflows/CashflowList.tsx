import {
  fetchCashflows,
  fetchTransactionsThisMonth,
  fetchBalance,
} from "@lib/data";
import type { User, Cashflow, Transaction } from "@lib/definitions";
import { CashflowCard } from "@components/cashflows/CashflowCard";
import { EditCashflows } from "@components/cashflows/EditCashflows";
import { auth } from "@/auth";
import { CashflowsOnboarding } from "@components/cashflows/CashflowsOnboarding";
import { BalanceCard } from "@components/cashflows/BalanceCard";
import { months } from "@lib/utils";

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
  // * abs these values because they're negative because expense transactions are negative
  const reoccuringTotal: string = reoccuring
    .reduce((a, b) => a + Math.abs(Number(b.amount)), 0)
    .toFixed(2);
  const expensesTotal: string = expenses
    .reduce((a, b) => a + Math.abs(Number(b.amount)), 0)
    .toFixed(2);

  // calculate remaining balance

  // calculate percentages of expenses, reoccuring, and balance
  const expensesPercentage: number =
    (Number(expensesTotal) / Number(cashflows.income)) * 100;
  const reoccuringPercentage: number =
    (Number(reoccuringTotal) / Number(cashflows.income)) * 100;

  const balance = await fetchBalance(user.id);

  return (
    <section>
      {/* open a sheet that shows a form to edit cashflows */}
      <span className="flex justify-end pb-3">
        <EditCashflows />
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
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
            badge={months[new Date().getMonth()].toLowerCase()}
            percentage={expensesPercentage}
            insideText={true}
          />
          <CashflowCard
            title="Reoccuring"
            badge={months[new Date().getMonth()].toLowerCase()}
            percentage={reoccuringPercentage}
            value={reoccuringTotal}
            insideText={true}
          />
        </div>

        <div className="flex flex-col md:flex-row md:col-span-2 xl:col-span-1 xl:flex-col gap-3">
          <CashflowCard
            title="This month"
            percentage={reoccuringPercentage + expensesPercentage}
            value={(Number(reoccuringTotal) + Number(expensesTotal)).toString()}
            insideText={true}
          />
          <BalanceCard
            title="Balance"
            value={balance.amount}
            user_id={user.id}
          />
        </div>
      </div>
    </section>
  );
}
