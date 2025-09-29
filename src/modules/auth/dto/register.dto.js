import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name at least 3 characters ka hona chahiye"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password at least 6 characters ka hona chahiye"),
});
