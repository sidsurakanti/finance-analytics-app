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
import { EditReoccuringForm } from "@components/reoccuring/EditReoccuringForm";
import { type Reoccuring } from "@lib/definitions";

export async function EditDialog({ reoccuring }: { reoccuring: Reoccuring }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-sky-700">
          <EditIcon width={20} height={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="tracking-medium">Edit reoccuring</DialogTitle>
          <DialogDescription>
            Make changes to this transaction here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <EditReoccuringForm reoccuring={reoccuring} />
      </DialogContent>
    </Dialog>
  );
}
