import { object, string } from "zod"
 
export const loginSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const registerSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(255, "Name must be less than 32 characters"),
  phone: string({ required_error: "Phone is required" })
    .min(1, "Phone is required")
    .max(32, "Phone must be less than 32 characters"),
})