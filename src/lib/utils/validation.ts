import { z } from "zod";

// ─────────────────────────────────────────────────────────────
// Common Field Rules
// ─────────────────────────────────────────────────────────────

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password is too long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const nameSchema = (field: string) =>
  z
    .string()
    .min(1, `${field} is required`)
    .max(50, `${field} must be less than 50 characters`)
    .regex(/^[a-zA-Z\s'-]+$/, `${field} contains invalid characters`);

// ─────────────────────────────────────────────────────────────
// Auth Schemas
// ─────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  user_name: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    first_name: nameSchema("First name"),
    last_name: nameSchema("Last name"),
    user_name: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    gender: z.enum(["Male", "Female", "Other"], {
      required_error: "Gender is required",
    }),
    email: emailSchema,
    phone_number: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9+\-() ]+$/, "Invalid phone number format"),
    password: passwordSchema,
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// ─────────────────────────────────────────────────────────────
// User Management Schemas
// ─────────────────────────────────────────────────────────────

export const createUserSchema = z.object({
  firstName: nameSchema("First name"),
  lastName: nameSchema("Last name"),
  email: emailSchema,
  password: passwordSchema,
  role: z.enum(["ADMIN", "USER", "VIEWER"], {
    required_error: "Role is required",
  }),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  firstName: nameSchema("First name").optional(),
  lastName: nameSchema("Last name").optional(),
  role: z.enum(["ADMIN", "USER", "VIEWER"]).optional(),
  active: z.boolean().optional(),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
