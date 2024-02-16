import { auth } from "@/auth";

import type { User, Reoccuring } from "@lib/definitions";
import { fetchReoccuring } from "@lib/data";
import { cn } from "@lib/utils";
import { badgeColors } from "@lib/colors";

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
import { ScrollArea } from "@components/ui/scroll-area";

export async function ReoccuringPreview() {
  const session = await auth();
  const user: User = session?.user as User;
  const reoccuring: Reoccuring[] = await fetchReoccuring(user);

  return (
    <>
      {/* make sure table is scrollable  */}
      <ScrollArea className="h-[350px] shadow-md rounded-md border border-border">
        <Table>
          <TableCaption>Reoccuring transactions</TableCaption>
          
          {/* columns  */}
          {/* stop header from being scrolled */}
          <TableHeader className="sticky top-0 bg-accent">
            <TableRow className="h-10">
              <TableHead>Name</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>

          {/* rows  */}
          <TableBody>
            {reoccuring.map((transaction, index) => (
              <TableRow key={index} className="h-20 text-md xl:text-lg">
                <TableCell>{transaction.name}</TableCell>

                <TableCell>
                  <Badge className="bg-sky-900">{transaction.timeperiod}</Badge>
                </TableCell>

                <TableCell>
                  <Badge className={cn(badgeColors[transaction.category])}>
                    {transaction.category}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
}
