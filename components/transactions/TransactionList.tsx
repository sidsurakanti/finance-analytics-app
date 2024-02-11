import { TransactionCard } from "@components/transactions/TransactionCard";
import type { User, Transaction } from "@lib/definitions";
import { fetchAllTransactions } from "@lib/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  user: User;
}

// Server component
export default async function TransactionList({ user }: Props) {
  const transactions: Transaction[] = await fetchAllTransactions(user);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <Table>
      <TableCaption>Transactions</TableCaption>
      <TableHeader>
        <TableRow className="h-14">
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow key={index} className="h-20 text-lg">
            <TableCell>{transaction.name}</TableCell>
            <TableCell>
              {`${months[transaction.created_at.getMonth()]} ${transaction.created_at.getDate()}, ${transaction.created_at.getFullYear()}`}
            </TableCell>
            <TableCell className="text-right">
              ${transaction.amount.toString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
