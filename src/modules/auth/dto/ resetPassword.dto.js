import { z } from "zod";

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token required"),
  newPassword: z.string().min(6, "Password at least 6 characters ka hona chahiye"),
});
