"use client";

import { type User, type Transaction } from "@/lib/definitions";
import { useForm, SubmitHandler } from "react-hook-form";
import { createTransaction } from "@/lib/actions";

// TODO: convert this using zod
interface Inputs {
  name: string;
  amount: Number;
}

export default function CreateTransactionForm({ user }: { user: User }) {
  // * this is a client component bc of the useForm hook
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const newTransaction: Transaction = {
      name: data.name,
      amount: data.amount,
      user_id: user.id,
      created_at: new Date(),
    };
    createTransaction(newTransaction);
  };

  return (
    <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-x-2">
        <input
          className="outline-none rounded-lg bg-[#2b2727] p-2"
          {...register("name", { required: true })}
          placeholder="Name"
        />
        <input
          className="outline-none rounded-lg bg-[#2b2727] p-2"
          {...register("amount", { required: true })}
          placeholder="Amount"
        />
      </div>
      <div>
        <input className="bg-blue-500 p-2 rounded-xl" type="submit" />
      </div>
    </form>
  );
}
