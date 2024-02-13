import type { Cashflow, Transaction, User } from "@lib/definitions";
import { fetchCashflows, fetchTransactionsThisMonth } from "@lib/data";
import { auth } from "@/auth";
import { Chart } from "@components/cashflows/Chart";
import { CashflowsOnboarding } from "@components/cashflows/CashflowsOnboarding";

export async function CashflowChart() {
  const session = await auth();
  const user = session?.user as User;

  const cashflows: Cashflow = await fetchCashflows(user);

  const transactionsThisMonth: Transaction[] =
    await fetchTransactionsThisMonth(user);
  const thisMonthTotal: string = transactionsThisMonth
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section className="flex justify-center items-center">
      {cashflows && (
        <Chart income={cashflows.income} expenses={thisMonthTotal} />
      )}
    </section>
  );
}
