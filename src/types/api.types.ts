// ─────────────────────────────────────────────────────────────
// Global API & Domain Types
// ─────────────────────────────────────────────────────────────

import type { Role } from "@/config/permissions";

// ── Generic API Response Wrappers ─────────────────────────────

/** Standard success envelope from Spring Boot backend */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

/** Paginated response envelope */
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // current page (0-indexed)
  first: boolean;
  last: boolean;
}

/** Standard error structure from the backend */
export interface ApiError {
  status: number;
  error: string;
  message: string;
  path?: string;
  timestamp?: string;
  validationErrors?: Record<string, string>;
}

// ── Pagination / Sort ─────────────────────────────────────────

export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
  direction?: "asc" | "desc";
}

// ── Auth ──────────────────────────────────────────────────────

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  companyName: string;
}
// OTP Verification
export interface SendOtpRequest {
  // Empty - endpoint doesn't need params
}

export interface VerifyOtpRequest {
  email_otp?: string;
  phone_otp?: string;
}

// User Profile
export interface UserProfileSave {
  userFullName: string;
  department: string;
  jobTitle: string;
  approverFullName: string;
  employeeId: number;
  role: string;
  dob: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CompanyInfoRequest {
  company_name: string;
  job_title: string;
  department: string;
  company_address1: string;
  company_address2?: string;
  company_city: string;
  company_pincode: string;
  company_country: string;
}

// Password Management
export interface ChangePasswordRequest {
  password: string;         // current password
  new_password: string;
  confirm_password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  new_password: string;
  confirm_password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
}

export interface AuthUser {
  id: number | string;
  email: string;
  user_name: string;
  firstName: string;
  lastName: string;
  role: Role;
  active: boolean;
  email_verified?: boolean;
  phone_number_verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

// ── Users ─────────────────────────────────────────────────────

export interface User {
  id: number | string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: Role;
  active?: boolean;
}

// ── APIs ──────────────────────────────────────────────────────

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type ApiType = "Active" | "Inactive" | "Draft";

export interface ApiEndpoint {
  endpointName: string;        // ← changed from "name"
  httpMethod: HttpMethod;      // ← changed from "method"
  apiVersion: string;          // ← changed from "version"
  primaryTable: string;
  joinTable?: string;
  description: string;
  isActive: boolean;           // ← changed from "apiType"
  isPublic: boolean;           // ← NEW
  userName: string;            // ← changed from "createdBy"
  responseSchema: Record<string, unknown>;
  sqlQuery: string;
  created_date_time?: string;  // ← NEW (snake_case)
  updated_date_time?: string;  // ← NEW (snake_case)
  updated_by?: string;
}

export interface CreateApiRequest {
  endpointName: string;
  httpMethod: HttpMethod;
  apiVersion: string;
  primaryTable: string;
  joinTable?: string;
  description: string;
  isActive: boolean;
  isPublic: boolean;
  userName: string;
  responseSchema?: Record<string, unknown>;
  sqlQuery: string;
}

// ── Common ────────────────────────────────────────────────────

export interface SelectOption<T = string> {
  label: string;
  value: T;
}
