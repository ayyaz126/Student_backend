import { getMyExpensesService } from "../services/getMyExpenses.service.js";

export const getMyExpensesController = async (req, res, next) => {
  try {
    const userId = req.user.id; // authMiddleware se aata hai

    const expenses = await getMyExpensesService(userId);

    res.status(200).json({
      message: "My expenses fetched successfully",
      expenses,
    });
  } catch (error) {
    next(error);
  }
};
