import { createExpenseService } from "../services/createExpense.service.js";
import { createExpenseSchema } from "../dto/createExpens.dto.js";

export const createExpenseController = async (req, res, next) => {
  try {
    // DTO validation
    const validatedData = createExpenseSchema.parse(req.body);

    const { amount, category_id, description } = validatedData;
    const userId = req.user.id; // req.user auth middleware se aata hai

    const expense = await createExpenseService(
      userId,
      amount,
      category_id,
      description
    );

    return res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    // Agar Zod ka validation error aaya to
    if (error.errors) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }
    next(error);
  }
};
