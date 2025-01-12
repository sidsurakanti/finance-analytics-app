"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { createTransactionSchema } from "@/schemas/new-transaction";

import type { Transaction, Reoccuring } from "@lib/definitions";
import { updateTransaction, updateBalance } from "@lib/actions";

import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { DialogFooter, DialogClose } from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { TypeSelect } from "@/components/transactions/edit/TypeSelect";

export function EditTransactionForm({
  transaction,
  reoccuring,
}: {
  transaction: Transaction;
  reoccuring: Reoccuring[];
}) {
  // create form using the current transactions values
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    // form validation
    resolver: zodResolver(createTransactionSchema),
    // default values
    defaultValues: {
      name: transaction.name,
      amount: "",
      type: transaction.type,
    },
  });

  // form submit handler
  const onSubmit: SubmitHandler<z.infer<typeof createTransactionSchema>> = (
    data: z.infer<typeof createTransactionSchema>,
  ) => {
    // console.log(data);

    // tranform data into a new transaction object
    const updatedTransaction: Transaction = {
      id: transaction.id,
      name: data.name,
      // if type of transaction is a not a paycheck or deposit
      // change the value to negative
      amount:
        data.type === "paycheck" || data.type === "deposit"
          ? data.amount
          : -data.amount,
      type: data.type,
      user_id: transaction.user_id,
      created_at: new Date(),
    };

    // cancel out old transaction amount from user balance and then update balance
    updateBalance(
      Number(transaction.amount) * -1 + Number(updatedTransaction.amount),
      transaction.user_id,
    );
    // add transaction to db
    updateTransaction(updatedTransaction);
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

          {form.watch("type") !== "reoccuring" && (
            <>
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
            </>
          )}

          {form.watch("type") === "reoccuring" && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select reoccuring transaction"></SelectValue>
                        </SelectTrigger>

                        <SelectContent>
                          {reoccuring.map((item) => {
                            return (
                              <SelectItem value={item.name} key={item.name}>
                                {item.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="888.88" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* make sure submit button also closes the sheet AND calls on submit */}
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="default"
                type="submit"
                className="w-full hover:bg-blue-500"
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
