import { type User } from "@lib/definitions";

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
import { CreateTransactionForm } from "@components/transactions/CreateTransactionForm";

export function TransactionSheet({ user }: { user: User }) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <span>
            <Button className="hidden md:block">
              <p>+ transaction</p>
            </Button>
            <Button className="md:hidden" size="icon">
              <PlusIcon height={17} width={17} />
            </Button>
          </span>
        </SheetTrigger>

        <SheetContent className="flex flex-col gap-5">
          <SheetHeader>
            <SheetTitle>New transaction</SheetTitle>
            <SheetDescription>
              Add a new transaction to your account. If this transaction is
              reoccuring, you can set it up in the Reoccuring tab.
            </SheetDescription>
          </SheetHeader>
          <CreateTransactionForm user={user} />
        </SheetContent>
      </Sheet>
    </>
  );
}
