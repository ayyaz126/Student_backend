import pool from "../../../adaptere/postgres/adaptere.postgres.js";

export const deleteCategoryService = async (id) => {

  const check = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
  if (check.rows.length === 0) {
    throw new Error("Category not found");
  }

  const result = await pool.query(
    "DELETE FROM categories WHERE id = $1 RETURNING id, name",
    [id]
  );

  return result.rows[0];
};
