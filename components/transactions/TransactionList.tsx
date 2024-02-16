import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "@components/ui/badge";

import { type User, type Transaction } from "@lib/definitions";
import { fetchAllTransactions } from "@lib/data";
import { cn, cashFormatter, dateFormatter } from "@lib/utils";
import { transactionTypeColors } from "@lib/colors";

interface Props {
  user: User;
}

// Server component
export default async function TransactionList({ user }: Props) {
  const transactions: Transaction[] = await fetchAllTransactions(user);

  return (
    <>
      <Table>
        {/* columns  */}
        <TableHeader>
          <TableRow className="h-14">
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        {/* rows  */}
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index} className="h-20 text-lg">
              <TableCell>{transaction.name}</TableCell>

              <TableCell>
                {dateFormatter(transaction.created_at, true)}
              </TableCell>

              <TableCell>
                <Badge className={cn(transactionTypeColors[transaction.type])}>
                  {transaction.type}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                {cashFormatter(Number(transaction.amount))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
