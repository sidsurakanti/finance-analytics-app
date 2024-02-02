import SideBar from "@/app/ui/components/dashboard/SideBar";
import TransactionSection from "@/app/ui/components/dashboard/TransactionsSection";
import { fetchCashflows, fetchTransactions, fetchUser } from "@/app/lib/data";

export default async function Dashboard() {
  const user = await fetchUser("janedoe@gmail.com");
  const cashflows = await fetchCashflows(user);
  const transactions = await fetchTransactions(user);
  console.log(transactions);

  return (
    <main className="flex flex-row min-h-screen w-4/5 mx-auto">
      <SideBar cashflow={cashflows} />
      <TransactionSection transactions={transactions}/>
    </main>
  );
}
