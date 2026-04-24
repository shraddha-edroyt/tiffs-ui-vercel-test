import { AxiosError } from "axios";
import type { ApiError } from "@/types/api.types";

/**
 * Normalise any error (Axios or generic) into a consistent ApiError shape.
 * Import and call this in your service files inside catch blocks.
 */
export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const data = error.response?.data as Partial<ApiError> | undefined;

    return {
      status: error.response?.status ?? 0,
      error: data?.error ?? error.code ?? "UnknownError",
      message:
        data?.message ??
        error.message ??
        "An unexpected error occurred. Please try again.",
      path: data?.path,
      timestamp: data?.timestamp ?? new Date().toISOString(),
      validationErrors: data?.validationErrors,
    };
  }

  if (error instanceof Error) {
    return {
      status: 0,
      error: "ClientError",
      message: error.message,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    status: 0,
    error: "UnknownError",
    message: "An unexpected error occurred.",
    timestamp: new Date().toISOString(),
  };
}

/**
 * Extract validation field errors from an ApiError.
 * Returns a record of { fieldName: errorMessage } or empty object.
 */
export function extractValidationErrors(
  error: ApiError
): Record<string, string> {
  return error.validationErrors ?? {};
}
