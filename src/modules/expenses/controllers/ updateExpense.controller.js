import { updateExpenseService } from "../services/updateExpense.service.js";
import { updateExpenseSchema } from "../dto/updataExpens.dto.js";

export const updateExpenseController = async (req, res, next) => {
  try {
    const { id } = req.params; // expense id from URL
    const userId = req.user.id; // from auth middleware

    // Validate input with Zod
    const validatedData = updateExpenseSchema.parse(req.body);

    const expense = await updateExpenseService(
      userId,
      id,
      validatedData.amount,
      validatedData.category_id,
      validatedData.description
    );
    
    res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: error.errors });
    }
    next(error);
  }
};
