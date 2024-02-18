import {
  fetchCashflows,
  fetchTransactionsThisMonth,
  fetchBalance,
} from "@lib/data";
import { months } from "@lib/utils";
import type { User, Cashflow, Transaction } from "@lib/definitions";

import { CashflowCard } from "@components/cashflows/CashflowCard";
import { CashflowsOnboarding } from "@components/cashflows/CashflowsOnboarding";
import { BalanceCard } from "@components/cashflows/BalanceCard";

import { auth } from "@/auth";


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

  // --- fetch data for cashflow cards ---
  const transactionsThisMonth: Transaction[] =
    await fetchTransactionsThisMonth(user);

  // get bank account balance from the database
  // ? maybe add an option to add this balance to savings
  const balance = await fetchBalance(user.id);

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

  // calculate percentages of expenses, reoccuring so we can use it in the progress circle
  const expensesPercentage: number =
    (Number(expensesTotal) / Number(cashflows.income)) * 100;
  const reoccuringPercentage: number =
    (Number(reoccuringTotal) / Number(cashflows.income)) * 100;

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        <div className="flex flex-col gap-3">
          {/* default this card to 100% of the progress bar  */}
          <CashflowCard
            title="Income"
            value={cashflows.income}
            badge={"monthly"}
            percentage={100}
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
            value={reoccuringTotal}
            badge={months[new Date().getMonth()].toLowerCase()}
            percentage={reoccuringPercentage}
            insideText={true}
          />
        </div>

        <div className="flex flex-col md:flex-row md:col-span-2 xl:col-span-1 xl:flex-col gap-3">
          <CashflowCard
            title="This month"
            value={(Number(reoccuringTotal) + Number(expensesTotal)).toString()}
            percentage={reoccuringPercentage + expensesPercentage}
            insideText={true}
          />
          <BalanceCard
            title="Balance"
            value={balance ? balance.amount : "0"}
            user_id={user.id}
          />
        </div>
      </section>
    </>
  );
}
