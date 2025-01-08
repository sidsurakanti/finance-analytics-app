import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { EditIcon } from "@components/ui/icons";
import { EditTransactionForm } from "@/components/transactions/edit/EditTransactionForm";
import type { Transaction, Reoccuring } from "@lib/definitions";

export function EditTransaction({
  transaction,
  reoccuring,
}: {
  transaction: Transaction;
  reoccuring: Reoccuring[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-sky-500 hover:text-white" variant={"ghost"} size={"icon"}>
          <EditIcon width={20} height={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="tracking-medium">
            Edit transaction
          </DialogTitle>
          <DialogDescription>
            Make changes to this transaction here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <EditTransactionForm
          transaction={transaction}
          reoccuring={reoccuring}
        />
      </DialogContent>
    </Dialog>
  );
}
