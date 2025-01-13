"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { createTransactionSchema } from "@/schemas/new-transaction";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { User, Transaction, Reoccuring } from "@lib/definitions";
import { createTransaction, updateBalance } from "@lib/actions";

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
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { SheetClose, SheetFooter } from "@components/ui/sheet";
import { TypeSelect } from "@/components/transactions/edit/TypeSelect";

// * this is a client component bc of the useForm hook
export function CreateTransactionForm({
  user,
  reoccuring,
}: {
  user: User;
  reoccuring: Reoccuring[];
}) {
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
      user_id: user.id,
      created_at: new Date(),
    };

    // update income in cashflows table if user adds a new paycheck

    // add transaction to db
    createTransaction(transaction);
    // update user balance
    updateBalance(Number(transaction.amount), user.id);
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

          {/* only show name input when type isnt reoccuring, otherwise show the select reoccuring component */}
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

          <SheetFooter>
            <Button type="submit" className="w-full hover:bg-blue-500">
              add
            </Button>

            <SheetClose asChild>
              <Button className="w-full hover:bg-rose-500">close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </>
  );
}
