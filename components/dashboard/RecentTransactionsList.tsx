import { type Transaction } from "@lib/definitions";
import { cn, cashFormatter } from "@lib/utils";
import { transactionTypeColors } from "@lib/colors";
import { inter } from "@/styles/fonts";

import { Badge } from "@components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";


export function RecentTransactionsList({ transactions }: { transactions: Transaction[] }) {
  return (
    <>
      <Table>
        {/* columns  */}
        <TableHeader className="bg-secondary">
          <TableRow className="h-10">
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        {/* rows  */}
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index} className="h-20 text-lg md:text-xl">
              <TableCell>{transaction.name}</TableCell>

              <TableCell className="text-center">
                <Badge className={cn(transactionTypeColors[transaction.type])}>
                  {transaction.type}
                </Badge>
              </TableCell>

              <TableCell
                className={cn(
                  inter.className,
                  "text-right tracking-wide font-medium",
                )}
              >
                {cashFormatter(Number(transaction.amount))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
