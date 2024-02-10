import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.string().email(),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    confirm: z.string().min(1, {
      message: "Password is required",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
