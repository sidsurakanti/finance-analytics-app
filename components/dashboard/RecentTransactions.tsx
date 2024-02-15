import { type Transaction } from "@lib/definitions";
import { cn, dateFormatter, cashFormatter } from "@lib/utils";
import { transactionTypeColors } from "@lib/colors";

import { Badge } from "@components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";

interface Props {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: Props) {
  return (
    <>
      <Table>
        {/* columns  */}
        <TableHeader>
          <TableRow className="h-14">
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        {/* rows  */}
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index} className="h-20 md:text-xl">
              <TableCell>{transaction.name}</TableCell>

              <TableCell className="text-center">
                <Badge
                  className={cn(
                    transactionTypeColors[transaction.type],
                    "text-[10px] px-2 py-[1px]  md:px-2.5 md:text-xs md:py-0.5",
                  )}
                >
                  {transaction.type}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                ${cashFormatter(Number(transaction.amount))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
