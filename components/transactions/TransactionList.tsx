import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "@components/ui/badge";

import { type User, type Transaction, type Reoccuring } from "@lib/definitions";
import { fetchAllTransactions, fetchReoccuring } from "@lib/data";
import { cn, cashFormatter, dateFormatter } from "@lib/utils";
import { transactionTypeColors } from "@lib/colors";
import { inter } from "@/styles/fonts";

import { DeleteButtonWrapper } from "@components/transactions/DeleteTransactionWrapper";
import { EditDialog } from "@components/transactions/EditTransactionDialog";


interface Props {
  user: User;
}

// Server component
export default async function TransactionList({ user }: Props) {
  const transactions: Transaction[] = await fetchAllTransactions(user);
  const reoccuring: Reoccuring[] =  await fetchReoccuring(user);

  return (
    <>
      <Table>
        {/* columns  */}
        <TableHeader>
          <TableRow className="h-14">
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>

        {/* rows  */}
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index} className="h-20 text-lg">
              <TableCell className="font-medium">{transaction.name}</TableCell>

              <TableCell className="text-sm">
                {dateFormatter(transaction.created_at)}
              </TableCell>

              <TableCell>
                <Badge className={cn(transactionTypeColors[transaction.type])}>
                  {transaction.type}
                </Badge>
              </TableCell>

              <TableCell
                className={cn(inter.className, "tracking-wide font-medium")}
              >
                {cashFormatter(Number(transaction.amount))}
              </TableCell>

              <TableCell className="text-right">
                <span className="flex gap-2 justify-end">
                  <EditDialog transaction={transaction} reoccuring={reoccuring} />
                  <DeleteButtonWrapper
                    transaction={transaction}
                  />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
