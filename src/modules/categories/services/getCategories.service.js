import pool from "../../../adaptere/postgres/adaptere.postgres.js";

export const getCategoriesService = async () => {
  const result = await pool.query(
    "SELECT id, name, description, created_at, updated_at FROM categories ORDER BY id ASC"
  );
  return result.rows;
};