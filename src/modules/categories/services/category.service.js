import pool from "../../../adaptere/postgres/adaptere.postgres.js";

export const createCategoryService = async (name, description) => {
 
  const existing = await pool.query(
    "SELECT * FROM categories WHERE name = $1",
    [name]
  );

  if (existing.rows.length > 0) {
    throw new Error("Category already exists");
  }


  const result = await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
    [name, description || null] 
  );

  return result.rows[0];
};



