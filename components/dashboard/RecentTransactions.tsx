import { TransactionCard } from "@components/transactions/TransactionCard";
import type { Transaction } from "@lib/definitions";

interface Props {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: Props) {
  return (
    <section>
      {transactions.map((transaction, index) => (
        <TransactionCard key={index} transaction={transaction} />
      ))}
    </section>
  );
}
