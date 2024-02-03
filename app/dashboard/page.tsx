import SideBar from "@/app/ui/components/dashboard/SideBar";
import TransactionSection from "@/app/ui/components/dashboard/TransactionsSection";
import {
  fetchCashflows,
  fetchTransactions,
  fetchTransactionsThisMonth,
  fetchUser,
} from "@/app/lib/data";

export default async function Dashboard() {
  const user = await fetchUser("janedoe@gmail.com");
  const cashflows = await fetchCashflows(user);
  const transactions = await fetchTransactions(user);
  const thisMonthsTransactions = await fetchTransactionsThisMonth(user);
  const thisMonthTotal = thisMonthsTransactions
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);
  console.log(transactions);

  return (
    <main className="flex flex-row min-h-screen w-4/5 mx-auto">
      <SideBar cashflow={cashflows} thisMonthTotal={thisMonthTotal} />
      <TransactionSection transactions={transactions} />
    </main>
  );
}
