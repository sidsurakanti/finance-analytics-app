import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "@components/ui/badge";
import { DeleteButtonWrapper } from "@components/transactions/DeleteTransactionWrapper";
import { EditDialog } from "@components/transactions/EditTransactionDialog";

import type { User, Transaction, Reoccuring } from "@lib/definitions";
import { fetchAllTransactions, fetchReoccuring } from "@lib/data";
import { cn, cashFormatter, dateFormatter } from "@lib/utils";
import { transactionTypeColors } from "@lib/colors";
import { inter } from "@/styles/fonts";


// server component
export default async function TransactionList({ user }: { user: User }) {
  const transactions: Transaction[] = await fetchAllTransactions(user);
  const reoccuring: Reoccuring[] = await fetchReoccuring(user);

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
            <TableRow key={index} className="group h-20 text-lg">
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

              <TableCell className="md:opacity-0 md:group-hover:opacity-100 transition-opacity text-right">
                <span className="flex gap-2 justify-end">
                  <EditDialog
                    transaction={transaction}
                    reoccuring={reoccuring}
                  />
                  <DeleteButtonWrapper transaction={transaction} />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
