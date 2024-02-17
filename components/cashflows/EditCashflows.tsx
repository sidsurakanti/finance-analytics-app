import { EditCashflowsForm } from "@components/cashflows/EditCashflowsForm";
import { fetchCashflows } from "@lib/data";
import { type User } from "@lib/definitions";
import { auth } from "@/auth";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@components/ui/button";
import { EditIcon } from "@components/ui/icons";

export async function EditCashflows() {
  const session = await auth();
  const user = session?.user as User;
  const cashflows = await fetchCashflows(user);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex flex-row gap-2" variant="ghost">
            <EditIcon width={20} height={20} />
            <p className="text-lg text-foreground/70 hidden md:block">change</p>
          </Button>
        </SheetTrigger>

        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>Edit cashflows</SheetTitle>
            <SheetDescription>
              Make changes to your current income and savings here. Click close
              when you&apos;re done.
            </SheetDescription>
          </SheetHeader>

          <EditCashflowsForm initialCashflows={cashflows} />
        </SheetContent>
      </Sheet>
    </>
  );
}
