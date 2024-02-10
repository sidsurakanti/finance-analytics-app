"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { type User, type Transaction } from "@lib/definitions";
import { createTransaction } from "@lib/actions";
import { createTransactionSchema } from "@/schemas/new-transaction";
import { z } from "zod";

export function CreateTransactionForm({ user }: { user: User }) {
  // * this is a client component bc of the useForm hook
  const { register, handleSubmit } =
    useForm<z.infer<typeof createTransactionSchema>>();

  const onSubmit: SubmitHandler<z.infer<typeof createTransactionSchema>> = (
    data: z.infer<typeof createTransactionSchema>
  ) => {
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
