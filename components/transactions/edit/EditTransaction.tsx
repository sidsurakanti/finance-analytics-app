import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { EditTransactionForm } from "@/components/transactions/edit/EditTransactionForm";
import type { Transaction, Reoccuring } from "@lib/definitions";
import { Pencil } from "lucide-react";

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
        <Button className="rounded-full hover:bg-neutral-400 hover:text-white" variant={"ghost"} size={"icon"}>
          <Pencil size={17} strokeWidth={1.5}/>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="tracking-medium">
            Edit transaction
          </DialogTitle>
          <DialogDescription>
            Make changes to this transaction here. Don&apos;t forget to click save once you&apos;ve finished!
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
