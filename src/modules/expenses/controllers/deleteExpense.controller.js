import { deleteExpenseService } from "../services/deleteExpense.service.js";
import { deleteExpenseSchema } from "../dto/deleteExpens.dto.js";

export const deleteExpenseController = async (req, res, next) => {
  try {
    // Validation
    const validatedData = deleteExpenseSchema.parse(req.params);
    const { id } = validatedData;

    // Authenticated user
    const userId = req.user.id;

    const deletedExpense = await deleteExpenseService(userId, id);

    res.status(200).json({
      message: "Expense deleted successfully",
      expense: deletedExpense,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: error.errors });
    }
    next(error);
  }
};
