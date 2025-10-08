import pool from "../../../adaptere/postgres/adaptere.postgres.js";

export const deleteExpenseService = async (userId, expenseId) => {
  // Sirf apna hi expense delete kar sakega user
  const query = `DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *`;
  const values = [expenseId, userId];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    throw new Error("Expense not found or not authorized to delete");
  }

  return result.rows[0];
};
