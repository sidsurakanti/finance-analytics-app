import { z } from "zod";

const timeperiodSchema = z.union([
  z.literal("monthly"),
  z.literal("yearly"),
  z.literal("weekly"),
  z.literal("bi-annually"),
]);

const categoriesSchema = z.union([
  z.literal("bills"),
  z.literal("entertainment"),
  z.literal("food"),
  z.literal("health"),
  z.literal("housing"),
  z.literal("insurance"),
  z.literal("personal"),
  z.literal("invesments"),
  z.literal("transportation"),
  z.literal("subscriptions"),
  z.literal("misc"),
]);

export const newReoccuringSchema = z.object({
  name: z.string().min(1, { message: "Please enter a name."}),
  timeperiod: timeperiodSchema,
  category: categoriesSchema,
});
