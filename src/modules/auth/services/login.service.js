import bcrypt from "bcrypt";
import pool from "../../../adaptere/postgres/adaptere.postgres.js";


 export const loginUser = async (email, password) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);


  // Agar query ka result empty hai (yaani database me us email ka user exist hi nahi karta),
  //  to turant error throw kar do → "User not found"
  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  // agar karta hai to uska data user me save kar lo
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
