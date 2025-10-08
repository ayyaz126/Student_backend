import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),

  category_id: z
    .number({
      required_error: "Category ID is required",
      invalid_type_error: "Category ID must be a number",
    })
    .int("Category ID must be an integer"),

  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});
