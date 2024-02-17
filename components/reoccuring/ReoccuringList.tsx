import { auth } from "@/auth";

import { type User, type Reoccuring } from "@lib/definitions";
import { fetchReoccuring } from "@lib/data";
import { cn } from "@lib/utils";
import { badgeColors } from "@lib/colors";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "@components/ui/badge";
import { EditDialog } from "@components/reoccuring/EditDialog";
import { DeleteButtonWrapper } from "@components/reoccuring/DeleteButtonWrapper";

export async function ReoccuringList() {
  const session = await auth();
  const user: User = session?.user as User;
  const reoccuring: Reoccuring[] = await fetchReoccuring(user);

  return (
    <>
      <Table>
        {/* columns  */}
        <TableHeader>
          <TableRow className="h-14">
            <TableHead>Name</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>

        {/* rows  */}
        <TableBody>
          {reoccuring.map((transaction, index) => (
            <TableRow key={index} className="h-20 text-md xl:text-lg">
              <TableCell className="font-medium text-lg">
                {transaction.name}
              </TableCell>

              <TableCell>
                <Badge className="bg-sky-700">{transaction.timeperiod}</Badge>
              </TableCell>

              <TableCell>
                <Badge className={cn(badgeColors[transaction.category])}>
                  {transaction.category}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <span className="flex gap-2 justify-end">
                  <EditDialog reoccuring={transaction} />
                  <DeleteButtonWrapper
                    reoccuringId={transaction.id as Number}
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
