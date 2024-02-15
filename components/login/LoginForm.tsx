"use client";

import { CardWrapper } from "@components/login/CardWrapper";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { FormError } from "@components/login/FormError";
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
import { formSchema } from "@/schemas/login";
import { login } from "@lib/actions";

export function LoginForm() {
  // state to display server error messages
  const [formError, setFormError] = useState<string | undefined>("");
  // form hook
  const form = useForm<z.infer<typeof formSchema>>({
    // form validation w/ zod
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // calls login server action
    const message = await login(data);
    // sets form error message
    setFormError(message);
  };

  return (
    <>
      <CardWrapper
        headerLabel="Login"
        description="Welcome back!"
        backButtonHref="/register"
        backButtonLabel="Don't have an account?"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
