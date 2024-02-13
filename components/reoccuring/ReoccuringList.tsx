import { fetchReoccuring } from "@/lib/data";
import { auth } from "@/auth";
import type { User, Reoccuring } from "@lib/definitions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "@components/ui/badge";

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
              <TableCell className="text-right">
                ${cashFormatter(Number(transaction.amount))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
