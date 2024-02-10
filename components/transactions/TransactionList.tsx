import { TransactionCard } from "@components/transactions/TransactionCard";
import type { User, Transaction } from "@lib/definitions";
import { fetchAllTransactions } from "@lib/data";

interface Props {
  user: User;
}

// Server component
export default async function TransactionList({ user }: Props) {
  const transactions: Transaction[] = await fetchAllTransactions(user);

  return (
    <div>
      {transactions.map((transaction, index) => (
        <TransactionCard key={index} transaction={transaction} />
      ))}
    </div>
  );
}
