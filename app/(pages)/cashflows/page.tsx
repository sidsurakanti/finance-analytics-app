import {
  fetchCashflows,
  fetchTransactionsThisMonth,
  fetchUser,
} from "@lib/data";
import { Cashflow, Transaction } from "@lib/definitions";
import { CashflowCard } from "@components/cashflows/CashflowCard";
import { Wrapper } from "@components/cashflows/EditButtonWrapper";

export default async function Cashflows() {
  const user = await fetchUser("janedoe@gmail.com");
  const cashflows: Cashflow = await fetchCashflows(user);
  const transactionsThisMonth: Transaction[] =
    await fetchTransactionsThisMonth(user);
  const thisMonthTotal: string = transactionsThisMonth
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  // TODO: extract this into another component and then add suspense
  return (
    <main>
      <Wrapper>
        <CashflowCard title="This month" value={thisMonthTotal} />
        <CashflowCard title="Savings" value={cashflows.savings} />
        <CashflowCard title="Income" value={cashflows.income} />
      </Wrapper>
    </main>
  );
}
