"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newIncomesSchema } from "@/schemas/new-incomes";

import { SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { IncomeSources } from "@/lib/definitions";
import { updateIncomeSource } from "@/lib/actions";

export default function EditIncomeSource({
  incomeSource,
}: {
  incomeSource: IncomeSources;
}) {
  const dateToDefVal = (pay_date: string): string => {
    const date = new Date(2025, 0, Number(pay_date));
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  const form = useForm<z.infer<typeof newIncomesSchema>>({
    resolver: zodResolver(newIncomesSchema),
    defaultValues: {
      name: incomeSource.name,
      income_amt: incomeSource.income_amt,
      frequency: incomeSource.frequency as
        | "semi-monthly"
        | "monthly"
        | undefined,
      pay_date1: dateToDefVal(incomeSource.pay_dates[0]),
      pay_date2:
        incomeSource.pay_dates.length > 1
          ? dateToDefVal(incomeSource.pay_dates[1])
          : "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof newIncomesSchema>> = (
    data: z.infer<typeof newIncomesSchema>,
  ) => {
    const { name, income_amt, frequency, pay_date1, pay_date2 } = data;
    const dF = (pay_date: string): string => {
      const d = new Date(pay_date);
      d.setDate(d.getDate() + 1);
      return d.getDate().toString();
    };

    const payDates =
      frequency === "monthly"
        ? [dF(pay_date1)]
        : [dF(pay_date1), dF(pay_date2)];

    const constructedData: IncomeSources = {
      id: incomeSource.id,
      user_id: incomeSource.user_id,
      name,
      income_amt,
      frequency,
      pay_dates: payDates,
    };

    // console.log(constructedData);
    updateIncomeSource(constructedData);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-4 mt-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="job 88" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="income_amt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="88888"></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Frequency</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a paycheck frequency" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={"semi-monthly"}>
                        semi-monthly
                      </SelectItem>
                      <SelectItem value={"monthly"}>monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pay_date1"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Pay Date{" "}
                  {form.watch("frequency") == "semi-monthly" ? "#1" : ""}
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} required></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("frequency") === "semi-monthly" && (
            <FormField
              control={form.control}
              name="pay_date2"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pay Date #2</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} required></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <SheetFooter className="">
            <Button
              type="submit"
              className="w-full bg-violet-200 hover:bg-violet-400 border border-violet-400 text-violet-900"
            >
              update
            </Button>

            <SheetClose asChild>
              <Button
                variant={"ghost"}
                className="w-full hover:bg-neutral-300 border border-neutral-300"
              >
                close
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </>
  );
}
