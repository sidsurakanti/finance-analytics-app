"use client";

import { FormError } from "@components/login/FormError";
import { CardWrapper } from "@components/login/CardWrapper";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/register";
import { User } from "@lib/definitions";
import { createUser } from "@/lib/actions";

export function RegisterForm() {
  // to display error messages from the server
  const [formError, setFormError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof registerSchema>>({
    // validate form values with zod
    resolver: zodResolver(registerSchema),
    // set default values for the form
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  // submit handler
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    // create new user object to send to server action
    const newUser: User = {
      id: "", // random id we can cancel this out when adding to the db
      name: data.name,
      email: data.email,
      password: data.password,
    };
    // console.log(newUser)

    // add user to db
    const message = await createUser(newUser);
    setFormError(message);
  };

  return (
    <>
      <CardWrapper
        headerLabel="Register"
        description="Please register to continue."
        backButtonHref="/login"
        backButtonLabel="Already have an account?"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={formError} />
            <Button type="submit" className="hover:bg-blue-500">
              Go
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
