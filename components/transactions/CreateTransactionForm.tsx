"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { type User, type Transaction } from "@lib/definitions";
import { createTransaction, paycheckUpdate, savingsUpdate } from "@lib/actions";
import { createTransactionSchema } from "@/schemas/new-transaction";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { SheetClose, SheetFooter } from "@/components/ui/sheet";

import { TypeSelect } from "@components/transactions/TypeSelect";

// * this is a client component bc of the useForm hook
export function CreateTransactionForm({ user }: { user: User }) {
  // form hook
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    // form validation
    resolver: zodResolver(createTransactionSchema),
    // default values
    defaultValues: {
      name: "",
      amount: "",
      type: "expense",
    },
  });

  // form submit handler
  const onSubmit: SubmitHandler<z.infer<typeof createTransactionSchema>> = (
    data: z.infer<typeof createTransactionSchema>,
  ) => {
    // console.log(data);

    // update savings if user withdrawls or deposits
    if (data.type === "withdrawl") {
      // remove amount form savings
      savingsUpdate(`-${data.amount}`, user.id);
    } else if (data.type === "deposit") {
      savingsUpdate(data.amount, user.id);
    } else if (data.type === "paycheck") {
      paycheckUpdate(data.amount, user.id);
    }

    // tranform data into a new transaction object
    const newTransaction: Transaction = {
      name: data.name,
      amount: data.amount,
      type: data.type,
      user_id: user.id,
      created_at: new Date(),
    };
    // add new transaction to db
    createTransaction(newTransaction);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Romeo and Juliet" {...field} />
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
                  <Input type="number" placeholder="888.88" {...field} />
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
                  <TypeSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" className="w-full hover:bg-blue-500">
                Add
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </>
  );
}
