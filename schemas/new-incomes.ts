import { z } from "zod";

export const newIncomesSchema = z.object({
  name: z.string().min(1, { message: "Please enter a name." }),
  income_amt: z.string().min(1, { message: "Please enter a valid amount." }),
  frequency: z.enum(["semi-monthly", "monthly"]),
  pay_date1: z.string().min(1, { message: "Please enter a valid date." }),
  pay_date2: z.string(),
});
