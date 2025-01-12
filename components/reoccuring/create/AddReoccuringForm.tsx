"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { newReoccuringSchema } from "@/schemas/new-reoccuring";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createReoccuring } from "@lib/actions";
import { type User, type Reoccuring } from "@lib/definitions";

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

import { FrequencySelect } from "@/components/reoccuring/create/FrequencySelect";
import { CategorySelect } from "@/components/reoccuring/create/CategorySelect";

// * client component bc of the useForm hook
export function AddReoccuringForm({ user }: { user: User }) {
  const form = useForm<z.infer<typeof newReoccuringSchema>>({
    // check if user is entering the correct type of inputs
    resolver: zodResolver(newReoccuringSchema),
    // default values for the components
    defaultValues: {
      name: "",
      timeperiod: "monthly",
      category: "bills",
    },
  });

  // form submit handler
  const onSubmit: SubmitHandler<z.infer<typeof newReoccuringSchema>> = (
    data: z.infer<typeof newReoccuringSchema>,
  ) => {
    // create a new reoccuring transaction object
    const newReoccuring: Reoccuring = {
      name: data.name,
      timeperiod: data.timeperiod,
      category: data.category,
      user_id: user.id,
    };

    // add reoccuring transc. to db
    createReoccuring(newReoccuring);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2 flex flex-col pt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Rent #1"
                    className="text-md  border border-border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategorySelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeperiod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <FormControl>
                  <FrequencySelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* make sure submit button also closes the sheet AND calls on submit */}
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
    </>
  );
}
