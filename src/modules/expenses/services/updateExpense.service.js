import pool from "../../../adaptere/postgres/adaptere.postgres.js";

export const updateExpenseService = async (userId, expenseId, amount, category_id, description) => {
  // Check if expense belongs to user
  const checkExpense = await pool.query(
    "SELECT * FROM expenses WHERE id = $1 AND user_id = $2",
    [expenseId, userId]
  );

  if (checkExpense.rows.length === 0) {
    throw new Error("Expense not found or you are not authorized to update this expense");
  }
//    Isse ensure hota hai ke user sirf apna hi expense update kar sakta hai, kisi aur ka nahi.

  // Update expense
  const result = await pool.query(
    `UPDATE expenses 
     SET amount = COALESCE($1, amount),
         category_id = COALESCE($2, category_id),
         description = COALESCE($3, description),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $4 AND user_id = $5
     RETURNING *`,
    [amount, category_id, description, expenseId, userId]
  );

  return result.rows[0];
};
