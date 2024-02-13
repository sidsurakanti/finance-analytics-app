import { z } from "zod";

export const createTransactionSchema = z.object({
  name: z.string(),
  amount: z.string(),
});
