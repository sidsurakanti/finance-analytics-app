import type { User, Transaction } from "@lib/definitions";
import { fetchAllTransactions } from "@lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "@components/ui/badge";
import { cn } from "@lib/utils";
import { transactionTypeColors } from "@/lib/colors";

interface Props {
  user: User;
}

// Server component
export default async function TransactionList({ user }: Props) {
  const transactions: Transaction[] = await fetchAllTransactions(user);
  const cashFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();
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
      <TableHeader>
        <TableRow className="h-14">
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
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
            <TableCell>
              <Badge className={cn(transactionTypeColors[transaction.type])} >{transaction.type}</Badge>
            </TableCell>
            <TableCell className="text-right">
              ${cashFormatter(Number(transaction.amount))}
          </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
