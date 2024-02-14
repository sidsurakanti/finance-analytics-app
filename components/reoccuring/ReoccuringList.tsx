import { fetchReoccuring } from "@/lib/data";
import { auth } from "@/auth";
import { inter } from "@/styles/fonts";
import type { User, Reoccuring } from "@lib/definitions";
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
import { badgeColors } from "@/lib/colors";

export async function ReoccuringList() {
  const session = await auth();
  const user: User = session?.user as User;
  const reoccuring: Reoccuring[] = await fetchReoccuring(user);
  const cashFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="h-14">
            <TableHead>Name</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reoccuring.map((transaction, index) => (
            <TableRow key={index} className="h-20 text-lg">
              <TableCell>{transaction.name}</TableCell>
              <TableCell>
                <Badge className="bg-blue-900">{transaction.timeperiod}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={cn(badgeColors[transaction.category])}>
                  {transaction.category}
                </Badge>
              </TableCell>
              <TableCell
                className={cn("text-right font-medium", inter.className)}
              >
                ${cashFormatter(Number(transaction.amount))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
