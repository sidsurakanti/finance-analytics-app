import { z } from "zod";

const paymentTypeSchema = z.union([
  z.literal("monthly"),
  z.literal("yearly"),
  z.literal("weekly"),
  z.literal("bi-annually"),
])

export const createTransactionSchema = z.object({
  name: z.string(),
  amount: z.string(),
  timeperiod: paymentTypeSchema
});
