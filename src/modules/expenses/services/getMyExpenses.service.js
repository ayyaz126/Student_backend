import pool from "../../../adaptere/postgres/adaptere.postgres.js";

export const getMyExpensesService = async (userId) => {
  const result = await pool.query(
    `SELECT e.*, c.name as category_name
     FROM expenses e
     LEFT JOIN categories c ON e.category_id = c.id
     WHERE e.user_id = $1
     ORDER BY e.created_at DESC`,
    [userId]
  );

  return result.rows; // saari expenses list return hogi
};
