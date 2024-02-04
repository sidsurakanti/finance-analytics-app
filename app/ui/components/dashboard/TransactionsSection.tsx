import { type Transaction } from "@lib/definitions";
import TransactionCard from "@components/dashboard/TransactionCard";
import TransactionDialogue from "@components/dashboard/TransactionDialogue";

type TransactionSectionProps = {
  transactions: Transaction[];
};

export default function TransactionSection({
  transactions,
}: TransactionSectionProps) {
  // TODO: complete add transaction functionality
  // TODO: transfer functionality to zod & react-hook-form
  // TODO: change component to shadcn-ui/table

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
          <TransactionDialogue />
        </div>
      </div>

      <div className="space-y-5">
        {transactions.map((transaction, index) => (
          <TransactionCard key={index} transaction={transaction} />
        ))}
      </div>
    </section>
  );
}
