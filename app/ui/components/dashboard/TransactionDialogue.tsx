"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogClose,
} from "@/ui/components/Dialogue";
import { useForm, SubmitHandler} from "react-hook-form"


// TODO: convert this using zod
interface Inputs {
  name: string,
  amount: Number,
}

export default function TransactionDialogue() {
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs>= (data) => {
    console.log(data);
  }

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

        <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-x-2">
            <input className="outline-none rounded-lg bg-[#2b2727] p-2" {...register("name", {required: true}) } placeholder="Name"/>
            <input className="outline-none rounded-lg bg-[#2b2727] p-2" {...register("amount", {required: true})} placeholder="Amount" />
          </div>
          <div>
              <input className="bg-blue-500 p-2 rounded-xl" type="submit" /> 
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
