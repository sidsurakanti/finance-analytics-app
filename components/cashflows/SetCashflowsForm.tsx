"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { setCashflowsSchema } from "@/schemas/set-cashflows";

import { type User, type Cashflow } from "@lib/definitions";
import { setCashflows } from "@lib/actions";

import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { SheetClose, SheetFooter } from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

// client component bc of the useForm hook
export function SetCashflowsForm({ user }: { user: User }) {
  // form hook
  const form = useForm<z.infer<typeof setCashflowsSchema>>({
    // zod validation resolver
    resolver: zodResolver(setCashflowsSchema),
    defaultValues: {
      income: "",
      savings: "",
    },
  });

  // submit handler
  const onSubmit: SubmitHandler<z.infer<typeof setCashflowsSchema>> = (
    data: z.infer<typeof setCashflowsSchema>,
  ) => {
    // convert data into a cashflow obj
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
        className="w-full flex flex-col gap-4 pt-4"
      >
        <FormField
          control={form.control}
          name="income"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Income</FormLabel>
              <FormControl>
                {/* use a neat trick to add a dollar sign to the input  */}
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
                {/* use a neat trick to add a dollar sign to the input  */}
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

        {/* close sheet and submit form at the same time  */}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="w-full hover:bg-sky-500">
              Finish
            </Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  );
}
