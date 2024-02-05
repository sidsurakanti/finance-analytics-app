import type { User } from "@lib/definitions";
import { fetchTransactions } from "@/lib/data";
import RecentTransactions from "@/(pages)/dashboard/components/RecentTransactions";

interface Props {
  user: User;
};

export default async function TransactionSection({
  user,
}: Props) {
  const transactions = await fetchTransactions(user);
  const recentTotal = transactions
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section className="w-4/5 h-fit p-5 space-y-6 bg-[#121212] outline outline-[#292929] rounded-lg text-xl">
      <header className="flex flex-row justify-between">
        <div className="flex flex-col space-y-2">
          <p className="text-[#C7C7C7]">
            Recent
          </p>
          <p className="text-5xl">
            ${recentTotal}
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <button className="bg-blue-500 rounded-lg px-4 py-2">
            add transaction
          </button>
        </div>
      </header>

      <RecentTransactions transactions={transactions}/>
    </section>
  );
}
