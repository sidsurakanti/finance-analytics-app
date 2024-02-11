import { TransactionCard } from "@components/transactions/TransactionCard";
import type { Transaction } from "@lib/definitions";
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
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: Props) {
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
      <TableCaption className="text-secondary-foreground/50">
        Recent transactions
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow className="md:text-lg md:h-24" key={index}>
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
