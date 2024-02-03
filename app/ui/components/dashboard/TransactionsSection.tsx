import { type Transaction } from "@/app/lib/definitions";
import TransactionCard from "@/app/ui/components/dashboard/TransactionCard";

type TransactionSectionProps = {
  transactions: Transaction[];
};

export default function TransactionSection({
  transactions,
}: TransactionSectionProps) {
  const recentTotal = transactions
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section className="w-4/5 h-fit p-5 space-y-7 bg-[#121212] outline outline-[#444444] rounded-lg">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-2">
          <p className="text-[#C7C7C7] text-xl">Recent</p>
          <p className="text-5xl">${recentTotal}</p>
        </div>
        <div className="flex flex-col justify-center">
          <button className="bg-blue-500 rounded-lg px-4 py-2">
            add transaction
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* <div className="w-full text-[#606060] flex flex-row justify-evenly space-x-10 px-10">
          <p>#</p>
          <p>Name</p>
          <p>Date</p>
          <p>Amount</p>
        </div> */}
        {transactions.map((transaction, index) => (
          <TransactionCard key={index} transaction={transaction} />
        ))}
      </div>
    </section>
  );
}
