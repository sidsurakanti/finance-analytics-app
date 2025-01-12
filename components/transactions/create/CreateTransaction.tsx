import { type Reoccuring, type User } from "@lib/definitions";

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
import { CreateTransactionForm } from "@/components/transactions/create/CreateTransactionForm";

export function CreateTransactionSheet({
  user,
  reoccuring,
}: {
  user: User;
  reoccuring: Reoccuring[];
}) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <span>
            <Button className="hidden md:block bg-pink-100 hover:bg-pink-200 border border-pink-200 text-pink-950 font-medium" variant={"ghost"}>
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

          {/* 
            we need to pass reoccuring transactions too 
            bc if their transaction is reoccuring they can just pick from their reoccuring list 
          */}
          <CreateTransactionForm user={user} reoccuring={reoccuring} />
        </SheetContent>
      </Sheet>
    </>
  );
}
