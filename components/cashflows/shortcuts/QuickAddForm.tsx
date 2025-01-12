"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { createTransactionSchema } from "@/schemas/new-transaction";

import type { Transaction, Reoccuring } from "@lib/definitions";
import { createTransaction, updateBalance } from "@lib/actions";

import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { DialogFooter, DialogClose } from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useEffect } from "react";

export function QuickAddForm({ reoccuring }: { reoccuring: Reoccuring }) {
  // create form using the current transactions values
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    // form validation
    resolver: zodResolver(createTransactionSchema),
    // default values
    defaultValues: {
      name: reoccuring.name,
      amount: "",
      type: "reoccuring",
    },
  });

  // form submit handler
  const onSubmit: SubmitHandler<z.infer<typeof createTransactionSchema>> = (
    data: z.infer<typeof createTransactionSchema>,
  ) => {
    // console.log(data);

    // tranform data into a new transaction object
    const transaction: Transaction = {
      name: data.name,
      // if type of transaction is a not a paycheck nor a deposit
      // change the value to negative
      amount:
        data.type === "paycheck" || data.type === "deposit"
          ? data.amount
          : -data.amount,
      type: data.type,
      user_id: reoccuring.user_id,
      created_at: new Date(),
    };

    // add transaction to db
    createTransaction(transaction);
    // update user balance
    updateBalance(Number(transaction.amount), reoccuring.user_id);
  };

  useEffect(() => {
    form.setFocus("amount");
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
              <FormItem className="flex flex-col">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="888.88" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* make sure submit button also closes the Dialog AND calls on submit */}
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="ghost"
                type="submit"
                className="w-full bg-amber-100 border border-amber-300 hover:bg-amber-300 text-amber-900"
              >
                add
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
