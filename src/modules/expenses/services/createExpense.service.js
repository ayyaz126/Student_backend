import pool from "../../../adaptere/postgres/adaptere.postgres.js";

export const createExpenseService = async (userId, amount, categoryId, description) => {
  try {
    const query = `
      INSERT INTO expenses (user_id, amount, category_id, description)
      VALUES ($1, $2, $3, $4)
      RETURNING id, user_id, amount, category_id, description, created_at, updated_at
    `;

    const values = [userId, amount, categoryId || null, description || null];
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw new Error("Error creating expense: " + error.message);
  }
};
