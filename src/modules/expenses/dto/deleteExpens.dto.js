import { z } from "zod";

export const deleteExpenseSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "Expense ID must be a valid number"),
});
