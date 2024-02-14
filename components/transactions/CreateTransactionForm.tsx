"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { type User, type Transaction } from "@lib/definitions";
import { createTransaction } from "@lib/actions";
import { createTransactionSchema } from "@/schemas/new-transaction";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { TypeSelect } from "@components/transactions/TypeSelect";

export function CreateTransactionForm({ user }: { user: User }) {
  // * this is a client component bc of the useForm hook
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      name: "",
      amount: "",
      type: "expense",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createTransactionSchema>> = (
    data: z.infer<typeof createTransactionSchema>,
  ) => {
    console.log(data);
    const newTransaction: Transaction = {
      name: data.name,
      amount: data.amount,
      type: data.type,
      user_id: user.id,
      created_at: new Date(),
    };
    createTransaction(newTransaction);
  };

  return (
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
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <TypeSelect onValueChange={field.onChange} defaultValue={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <SheetFooter>
          <SheetClose asChild>
            <Button
              variant="default"
              type="submit"
              className="w-full hover:bg-blue-500"
            >
              Add
            </Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  );
}
