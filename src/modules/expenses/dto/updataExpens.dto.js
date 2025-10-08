import { z } from "zod";

export const updateExpenseSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than 0")
    .optional(),
  category_id: z
    .number({ invalid_type_error: "Category ID must be a number" })
    .optional(),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});