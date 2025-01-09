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
    <section className="bg-accent/75 text-foreground border border-border rounded-lg p-5 flex flex-col gap-5 shadow-md">
      <header className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-md xl:text-lg tracking-wide">
            Reoccuring transactions
          </p>
        </div>
      </header>

      {/* make sure table is scrollable  */}
      <ScrollArea className="h-[380px]">
        <Table>
          <TableCaption>Reoccuring transactions</TableCaption>

          {/* columns  */}
          {/* stop header from being scrolled */}
          <TableHeader className="sticky top-0 bg-secondary">
            <TableRow className="h-12">
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Frequency</TableHead>
              <TableHead className="text-right">Category</TableHead>
            </TableRow>
          </TableHeader>

          {/* rows  */}
          <TableBody>
            {reoccuring.map((transaction, index) => (
              <TableRow key={index} className="h-20 text-md xl:text-lg">
                <TableCell className="text-lg">
                  {transaction.name}
                </TableCell>

                <TableCell className="text-center">
                  <Badge className="bg-sky-700">{transaction.timeperiod}</Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Badge className={cn(badgeColors[transaction.category])}>
                    {transaction.category}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </section>
  );
}
