import TransactionCard from "@/(pages)/transactions/components/TransactionCard";
import type { Transaction } from "@/lib/definitions";

interface Props {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: Props) {
  return (
    <section className="space-y-5">
      {transactions.map((transaction, index) => (
        <TransactionCard key={index} transaction={transaction} />
      ))}
    </section>
  );
}
