import pool from "../../../adaptere/postgres/adaptere.postgres.js";

export const updateCategoryService = async (id, name, description) => {

  const check = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
  if (check.rows.length === 0) {
    throw new Error("Category not found");
  }

  // Check duplicate name (agar new name already exist hai)
  if (name) {
    const duplicate = await pool.query(
      "SELECT * FROM categories WHERE name = $1 AND id != $2",
      [name, id]
    );
    if (duplicate.rows.length > 0) {
      throw new Error("Category with this name already exists");
    }
  }

  // Update category
  const result = await pool.query(
    `UPDATE categories 
     SET name = COALESCE($1, name), 
         description = COALESCE($2, description), 
         updated_at = NOW()
     WHERE id = $3 
     RETURNING id, name, description, created_at, updated_at`,
    [name, description, id]
  );

  return result.rows[0];
};
