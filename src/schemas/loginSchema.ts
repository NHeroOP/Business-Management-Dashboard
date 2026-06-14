import * as z from "zod";

export const loginSchema = z.object({
  identifier: z.union([
    z.string().min(4, "Username must be at least 4 characters").optional(),
    z.email("Invalid email address").optional()
  ]),
  password: z.string().min(6, "Password must be at least 6 characters")
});
