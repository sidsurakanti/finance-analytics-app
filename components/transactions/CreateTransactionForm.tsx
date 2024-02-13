"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { type User, type Transaction } from "@lib/definitions";
import { createTransaction } from "@lib/actions";
import { createTransactionSchema } from "@/schemas/new-transaction";
import { z } from "zod";

import { CardWrapper } from "@/components/login/CardWrapper";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateTransactionForm({ user }: { user: User }) {
  // * this is a client component bc of the useForm hook
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      name: "",
      amount: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createTransactionSchema>> = (
    data: z.infer<typeof createTransactionSchema>,
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
    <CardWrapper
      headerLabel="Add transaction"
      backButtonHref="/transactions"
      backButtonLabel="Go back"
      description="Create a new transaction"
      showBackIcon
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2 flex flex-col"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Romeo and Juliet" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="888.88" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="secondary"
            type="submit"
            className="hover:bg-accent hover:text-white"
          >
            Add
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
