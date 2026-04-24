/**
 * User Service
 *
 * ⚠️  DUMMY ENDPOINTS — Replace with actual Spring Boot endpoints when received.
 *
 * Placeholders:
 *   GET    /users            → List users (paginated)
 *   GET    /users/:id        → Get single user
 *   POST   /users            → Create user (admin only)
 *   PUT    /users/:id        → Update user
 *   DELETE /users/:id        → Delete user
 */

import apiClient from "@/lib/api/interceptors";
import { handleApiError } from "@/lib/api/errorHandler";
import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from "@/types/api.types";

export async function getUsersApi(
  params?: PaginationParams
): Promise<PaginatedResponse<User>> {
  try {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<User>>>(
      "/user/list", // ← replace with real endpoint
      { params }
    );
    return data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getUserByIdApi(id: string | number): Promise<User> {
  try {
    const { data } = await apiClient.get<ApiResponse<User>>(
      `/user/${id}` // ← replace with real endpoint
    );
    return data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function createUserApi(payload: CreateUserRequest): Promise<User> {
  try {
    const { data } = await apiClient.post<ApiResponse<User>>(
      "/user/register", // ← replace with real endpoint
      payload
    );
    return data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function updateUserApi(
  id: string | number,
  payload: UpdateUserRequest
): Promise<User> {
  try {
    const { data } = await apiClient.put<ApiResponse<User>>(
      `/user/${id}`, // ← replace with real endpoint
      payload
    );
    return data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function deleteUserApi(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`/user/${id}`); // ← replace with real endpoint
  } catch (error) {
    throw handleApiError(error);
  }
}
