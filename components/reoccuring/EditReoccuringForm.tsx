"use client";

import { type User, type Reoccuring } from "@lib/definitions";
import { useForm, SubmitHandler } from "react-hook-form";
import { newReoccuringSchema } from "@/schemas/new-reoccuring";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateReoccuring } from "@/lib/actions";

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

import { FrequencySelect } from "@components/reoccuring/FrequencySelect";
import { CategorySelect } from "@components/reoccuring/CategorySelect";

export function EditReoccuringForm({ reoccuring }: { reoccuring: Reoccuring }) {
  const { name, timeperiod, category } = reoccuring;

  const form = useForm<z.infer<typeof newReoccuringSchema>>({
    resolver: zodResolver(newReoccuringSchema),
    defaultValues: {
      name: name,
      timeperiod: timeperiod,
      category: category,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof newReoccuringSchema>> = (
    data: z.infer<typeof newReoccuringSchema>,
  ) => {
    const updatedReoccuring: Reoccuring = {
      id: reoccuring.id,
      name: data.name,
      timeperiod: data.timeperiod,
      category: data.category,
      user_id: reoccuring.user_id,
    };

    updateReoccuring(updatedReoccuring);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5"
        >
          <div className="space-y-4">
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
                      className="text-md border border-border"
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
          </div>

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
