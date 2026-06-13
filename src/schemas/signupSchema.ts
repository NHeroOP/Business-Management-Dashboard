import * as z from "zod";

export const signupSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})
