import { z } from "zod";

export const setCashflowsSchema = z.object({
  income: z.string().min(1, {
    message: "Please enter a valid amount.",
  }),
  savings: z.string().min(1, {
    message: "Please enter a valid amount.",
  }),
  balance: z.string().min(1, {
    message: "Please enter a valid amount.",
  }),
});
