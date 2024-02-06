import { fetchAllTransactions, fetchUser } from "@/lib/data"
import type { Transaction } from "@/lib/definitions"
import TransactionCard from "./components/TransactionCard";
import Link from "next/link";

export default async function Transactions() {
  const user = await fetchUser("janedoe@gmail.com");
  const transactions: Transaction[] = await fetchAllTransactions(user)

  return (
    <main className="md: min-height-64 bg-green-500">
      <Link 
        className="text-blue-500"
        href="/transactions/create" 
      >
        add transaction
      </Link>
      {transactions.map((transaction, index) => (
        <TransactionCard key={index} transaction={transaction} />
      ))}
    </main>
  )
}