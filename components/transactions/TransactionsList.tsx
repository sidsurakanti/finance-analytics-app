import { fetchAllTransactions, fetchReoccuring } from "@/lib/data";
import { DataTable } from "@/components/transactions/DataTable";
import { User, Transaction, Reoccuring } from "@/lib/definitions";
import { columns } from "@/components/transactions/TransactionColumns";
import { auth } from "@/auth";

export default async function TransactionList() {
  const session = await auth();
  const user = session?.user as User;
  const transactions: Transaction[] = await fetchAllTransactions(user);
  // fetch reoccuring transactions to pass to the CreateTransactionForm and EditTransactionForm
  // we need this for when the user is creating a transactions thats also a reoccuring transaction
  const reoccuring: Reoccuring[] = await fetchReoccuring(user);
  // console.log(transactions);

  return (
    <section>
      <DataTable
        columns={columns}
        data={transactions}
        reoccuring={reoccuring}
        user={user}
      />
    </section>
  );
}
