"use client";

import { type User, type Transaction } from "@/lib/definitions";
import { useForm, SubmitHandler } from "react-hook-form";
import { createTransaction } from "@/lib/actions";

// TODO: convert to a zod schema
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
    <form onSubmit={handleSubmit(onSubmit)}>
        <input
        className="text-black"
          {...register("name", { required: true })}
          placeholder="Name"
        />
        <input
          className="text-black"
          {...register("amount", { required: true })}
          placeholder="Amount"
        />
        <input className="bg-blue-500" type="submit" />
    </form>
  );
}
