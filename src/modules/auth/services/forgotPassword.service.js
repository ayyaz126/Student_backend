import pool from "../../../adaptere/postgres/adaptere.postgres.js";
import { sendEmail } from "../../../util/email.js";
import { generateResetToken } from "../../../util/jwt.js";

export const forgotPasswordService = async (email) => {
  const query = `SELECT id, name, email FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  const user = result.rows[0];

  const resetToken = generateResetToken(user.id);

  const expiry = new Date(Date.now() + 15 * 60 * 1000);
  await pool.query(
    `UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE id = $3`,
    [resetToken, expiry, user.id]
  );

  await sendEmail(
    user.email,
    "Reset Your Password",
    `
      <p>Hello ${user.name || "User"},</p>
      <p>You requested to reset your password.</p>
      <p>Your reset token is:</p>
      <code>${resetToken}</code>
      <p>This token is valid for 15 minutes only.</p>
    `
  );

  return {
    message: "Reset password email sent",
    resetToken,
  };
};
