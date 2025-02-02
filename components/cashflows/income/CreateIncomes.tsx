"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newIncomesSchema } from "@/schemas/new-incomes";
import { getDate } from "date-fns";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
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

import { createIncomeSource } from "@/lib/actions";

export default function CreateIncomeSource({ user_id }: { user_id: string }) {
  const form = useForm<z.infer<typeof newIncomesSchema>>({
    resolver: zodResolver(newIncomesSchema),
    defaultValues: {
      name: "",
      income_amt: "",
      frequency: "monthly",
      pay_date1: "",
      pay_date2: "",
    },
  });

  const customGetDate = (dt: string) => {
    const dateOfMonth = dt.slice(-2);
    // if (dateOfMonth + 1 > 31) return dateOfMonth
    // else return dateOfMonth + 1
    return Number(dateOfMonth);
  };

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

    const constructedData = {
      name,
      income_amt,
      frequency,
      pay_dates: payDates,
    };
    console.log(constructedData);

    createIncomeSource(user_id, constructedData);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            + source
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>Create income</SheetTitle>
            <SheetDescription>
              Let&apos;s add a new income source!
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              className="w-full flex flex-col gap-4 mt-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Job 88" {...field}></Input>
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
                      <Input
                        type="number"
                        {...field}
                        placeholder="8888.88"
                      ></Input>
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

              <SheetFooter className="mt-2">
                <Button
                  variant={"outline"}
                  type="submit"
                  className="w-full bg-orange-200 border border-orange-300 hover:bg-orange-300 transition-colors"
                >
                  add
                </Button>

                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="w-full border border-neutral-300 hover:bg-neutral-300"
                  >
                    close
                  </Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
