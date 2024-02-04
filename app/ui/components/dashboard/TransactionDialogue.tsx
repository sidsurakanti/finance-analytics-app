import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "@/ui/components/Dialogue";

export default function TransactionDialogue() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-blue-500 rounded-lg px-4 py-2">
          add transaction
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transactions</DialogTitle>
        </DialogHeader>

        <div>
          <input type="text" placeholder="Name" />
          <input type="number" placeholder="Amount" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
