"use client";

import { CardWrapper } from "@/components/login/CardWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/login/FormError";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas/login";
import { authenticate } from "@lib/actions";
import { useState } from "react";

export function LoginForm() {
  const [formError, setFormError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // call server action
    const message = await authenticate(data);
    setFormError(message);
  };

  return (
    <div>
      <CardWrapper
        headerLabel="Login"
        backButtonHref="/register"
        backButtonLabel="Don't have an account?"
        showSocial
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2 flex flex-col"
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
                    <Input
                      placeholder="Password"
                      type="password"
                      {...field}
                    ></Input>
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
    </div>
  );
}
