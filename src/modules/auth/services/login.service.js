import bcrypt from "bcrypt";
import pool from "../../../adaptere/postgres/adaptere.postgres.js";


 export const loginUser = async (email, password) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);



  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  
  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
  };
};
