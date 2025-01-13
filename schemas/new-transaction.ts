import { z } from "zod";

export const createTransactionSchema = z.object({
  name: z.string().min(1, { message: "Please enter a name." }),
  amount: z.string().min(1, { message: "Please enter a valid amount." }),
  type: z.enum(["paycheck", "expense", "deposit", "withdrawl", "reoccuring"]),
});
