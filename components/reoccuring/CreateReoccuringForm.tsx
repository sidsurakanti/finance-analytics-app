"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { type User, type Cashflow } from "@lib/definitions";
import { setCashflows } from "@lib/actions";
import { setCashflowsSchema } from "@/schemas/set-cashflows";
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

import { Button } from "@components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

export function SetCashflowsForm({ user }: { user: User }) {
  // * this is a client component bc of the useForm hook
  const form = useForm<z.infer<typeof setCashflowsSchema>>({
    resolver: zodResolver(setCashflowsSchema),
    defaultValues: {
      income: "",
      savings: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof setCashflowsSchema>> = (
    data: z.infer<typeof setCashflowsSchema>,
  ) => {
    const newCashflows: Cashflow = {
      income: data.income.toString(),
      savings: data.savings.toString(),
      user_id: user.id,
    };
    setCashflows(newCashflows);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-2 flex flex-col pt-4"
      >
        <FormField
          control={form.control}
          name="income"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Income</FormLabel>
              <FormControl>
                <div className="relative rounded-md w-full shadow-sm border border-border">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-secondary-foreground/50 sm:text-md">
                      $
                    </span>
                  </div>
                  <Input
                    {...field}
                    placeholder="0.00"
                    className="p-5 pl-7 text-lg"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="savings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Savings</FormLabel>
              <FormControl>
                <div className="relative rounded-md w-full shadow-sm border border-border">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-secondary-foreground/50 sm:text-md">
                      $
                    </span>
                  </div>
                  <Input
                    {...field}
                    placeholder="0.00"
                    className="p-5 pl-7 text-lg"
                  />
                </div>
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
              Finish
            </Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  );
}
