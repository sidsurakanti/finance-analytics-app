"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newIncomesSchema } from "@/schemas/new-incomes";

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

  const onSubmit: SubmitHandler<z.infer<typeof newIncomesSchema>> = (
    data: z.infer<typeof newIncomesSchema>,
  ) => {
    // console.log(data);
    const { name, income_amt, frequency, pay_date1, pay_date2 } = data;
    const payDates =
      frequency === "monthly"
        ? [new Date(pay_date1).getDate() + 1]
        : [
            new Date(pay_date1).getDate() + 1,
            new Date(pay_date2).getDate() + 1,
          ];
    const constructedData = {
      name,
      income_amt,
      frequency,
      pay_dates: payDates,
    };

    createIncomeSource(user_id, constructedData);
    console.log(constructedData);
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
            <SheetTitle>New Income</SheetTitle>
            <SheetDescription>
              Let&apos;s add a new income source!
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              className="w-full flex flex-col gap-2 mt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="88888"
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
                  <FormItem>
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
                  <FormItem>
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
                    <FormItem>
                      <FormLabel>Pay Date #2</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} required></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <SheetFooter>
                <Button type="submit" className="w-full hover:bg-blue-500">
                  Add
                </Button>

                <SheetClose asChild>
                  <Button className="w-full hover:bg-rose-500">Close</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
