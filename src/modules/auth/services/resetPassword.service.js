import pool from "../../../adaptere/postgres/adaptere.postgres.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const RESET_TOKEN_SECRET = process.env.RESET_TOKEN_SECRET || "reset_secret";

export const resetPasswordService = async (token, newPassword) => {
  try {
    // 1. Verify JWT (to get userId)
  //   User se mila token JWT ke sath verify hota hai.
  //  Agar valid hoga to decoded.id (user ka id) mil jayega.
  //   Agar invalid ya expire hoga to error throw karega.
    const decoded = jwt.verify(token, RESET_TOKEN_SECRET);
    const userId = decoded.id;

    // 2. Check DB for token and expiry
    const query = `
      SELECT * FROM users 
      WHERE id = $1 
        AND password_reset_token = $2 
        AND password_reset_expires > NOW()
    `;
    const result = await pool.query(query, [userId, token]);
    // Agar user nahi mila ya token expire ho gaya → error throw hoga.

    if (result.rows.length === 0) {
      throw new Error("Invalid or expired token");
    }

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update password & clear reset token and expiry
    await pool.query(
      `UPDATE users SET password = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE id = $2`,
      [hashedPassword, userId]
    );

    return { message: "Password reset successful" };
  } catch (error) {
    throw new Error(error.message || "Invalid or expired token");
  }
};
