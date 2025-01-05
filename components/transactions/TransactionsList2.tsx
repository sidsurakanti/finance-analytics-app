import { fetchAllTransactions } from "@/lib/data";
import { DataTable } from "@/components/transactions/DataTable";
import { User, Transaction } from "@/lib/definitions";
import { columns } from "@/components/transactions/TransactionColumns";

export default async function TransactionList({ user }: { user: User }) {
  const transactions: Transaction[] = await fetchAllTransactions(user);
  // console.log(transactions);

  return (
    <section>
      <DataTable columns={columns} data={transactions} />
    </section>
  );
}
