import express from "express";
import { createExpenseController } from "../controllers/createExpense.controller.js";
import { getMyExpensesController } from "../controllers/getMyExpenses.controller.js";
import { updateExpenseController } from "../controllers/ updateExpense.controller.js";
import { deleteExpenseController } from "../controllers/deleteExpense.controller.js";
import { authMiddleware } from "../../../middleware/auth.middleware.js";
const router = express.Router();

router.post("/create", authMiddleware, createExpenseController);
router.get("/me", authMiddleware, getMyExpensesController);
router.put("/edit/:id", authMiddleware, updateExpenseController);
router.delete("/delete/:id", authMiddleware, deleteExpenseController);


export default router;

