import SideBar from "@/app/ui/dashboard/SideBar";
import { fetchCashflows, fetchTransactions, fetchUser } from "@/app/lib/data";

export default async function Dashboard() {
  const user = await fetchUser("johndoe@gmail.com");
  const cashflows = await fetchCashflows(user);
  const transactions = await fetchTransactions(user);
  console.log(transactions);

  return (
    <main className="min-h-screen w-4/5 mx-auto">
      <SideBar cashflow={cashflows} />
    </main>
  );
}
