import { auth } from "@/auth";

import { type User, type Reoccuring } from "@lib/definitions";
import { fetchReoccuring } from "@lib/data";
import { cn } from "@lib/utils";
import { reoccuringCategoryColors } from "@lib/colors";
import { columns } from "@/components/reoccuring/ReoccuringColumns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "@components/ui/badge";
import { EditRecurring } from "@/components/reoccuring/EditRecurringDialog";
import { DataTable } from "@/components/reoccuring/DataTable";

export async function ReoccuringList() {
  // fetch reoccuing transactions
  const session = await auth();
  const user: User = session?.user as User;
  const reoccuring: Reoccuring[] = await fetchReoccuring(user);

  return (
    <main>
      <DataTable columns={columns} data={reoccuring} user={user} />
    </main>
  );
}
