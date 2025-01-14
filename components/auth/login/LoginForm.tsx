"use client";

import { AuthCardWrapper } from "@/components/auth/CardWrapper";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { FormError } from "@/components/auth/FormError";
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
  const zodFormHandler = useForm<z.infer<typeof formSchema>>({
    // use zod resolver to validate form data against schema
    // @see /schemas/login
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit handler, runs after passing form validation
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // calls login server action (@see /lib/actions)
    const message = await login(data);
    // show a form error message if login fails
    setFormError(message);
  };

  return (
    <>
      <AuthCardWrapper
        headerLabel="Login"
        description="Welcome back!"
        backButtonLabel="Don't have an account?"
        backButtonHref="/register"
      >
        <Form {...zodFormHandler}>
          <form
            onSubmit={zodFormHandler.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2"
          >
            <FormField
              control={zodFormHandler.control}
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
              control={zodFormHandler.control}
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
            <Button
              type="submit"
              className="mt-2 bg-violet-100 dark:bg-violet-200 text-violet-950 hover:bg-violet-300/70 border border-violet-300 shadow-sm"
            >
              go
            </Button>
          </form>
        </Form>
      </AuthCardWrapper>
    </>
  );
}
