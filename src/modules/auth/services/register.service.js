import bcrypt from "bcrypt";
import pool from "../../../adaptere/postgres/adaptere.postgres.js";

export const registerUser = async (name, email, password) => {
  const checkQuery = `SELECT * FROM users WHERE email = $1`;
  const checkResult = await pool.query(checkQuery, [email]);

  if (checkResult.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, role, created_at
    `;
  const values = [name, email,hashedPassword];

  const result = await pool.query(query, values);
  return result.rows[0];
};
