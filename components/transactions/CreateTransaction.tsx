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
import type { User } from "@lib/definitions";

import { CreateTransactionForm } from "@/components/transactions/CreateTransactionForm";

export function TransactionSheet({ user }: { user: User }) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <Button className="hidden md:block">
              <p>+ transaction</p>
            </Button>
            <Button className="md:hidden" size="icon">
              <PlusIcon height={17} width={17} />
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create transaction</SheetTitle>
            <SheetDescription>
              Add a new transaction to your account
            </SheetDescription>
            <CreateTransactionForm user={user} />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
