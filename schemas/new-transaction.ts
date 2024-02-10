import { z } from "zod";

export const createTransactionSchema = z.object({
  name: z.string(),
  amount: z.number().min(0.01, {
    message: "Please enter a valid amount."
  }),
});
