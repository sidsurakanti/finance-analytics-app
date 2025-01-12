import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import { PlusIcon } from "@components/ui/icons";

import { type User } from "@lib/definitions";
import { AddReoccuringForm } from "@/components/reoccuring/create/AddReoccuringForm";

// sheet to add reoccuring transactions
export function ReoccuringSheet({ user }: { user: User }) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <Button
              className="hidden md:block bg-amber-100 hover:bg-amber-200 border border-amber-200 text-blue-950 font-medium"
              variant={"ghost"}
            >
              <p>+ reoccuring</p>
            </Button>
            <Button className="md:hidden" size="icon">
              <PlusIcon height={17} width={17} />
            </Button>
          </div>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>New reoccuring</SheetTitle>
            <SheetDescription>
              This will help track your reoccuring expenses and make it easier
              to add them to transactions.
            </SheetDescription>
          </SheetHeader>

          <AddReoccuringForm user={user} />
        </SheetContent>
      </Sheet>
    </>
  );
}
