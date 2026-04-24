/**
 * API Management Service
 *
 * ⚠️  DUMMY ENDPOINTS — Replace with actual Spring Boot endpoints.
 */

import apiClient from "@/lib/api/interceptors";
import { handleApiError } from "@/lib/api/errorHandler";
import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  ApiEndpoint,
  CreateApiRequest,
} from "@/types/api.types";

export async function getApisApi(userName: string): Promise<ApiEndpoint[]> {
  try {
    const { data } = await apiClient.get<ApiResponse<ApiEndpoint[]>>(
      `/config/fetchApi/${userName}` // ← UPDATED
    );
    return data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getApiByIdApi(
  endpointName: string,
  httpMethod: string
): Promise<ApiEndpoint> {
  try {
    const { data } = await apiClient.get<ApiResponse<ApiEndpoint>>(
      `/config/fetchApiDetails/${endpointName}/${httpMethod}` // ← UPDATED
    );
    return data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function createApiApi(
  payload: CreateApiRequest
): Promise<ApiEndpoint> {
  try {
    const { data } = await apiClient.post<ApiResponse<ApiEndpoint>>(
      "/config", // ← UPDATED
      payload
    );
    return data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getTableDetailsApi(
  schemaName: string,
  tableName: string
): Promise<unknown> {
  try {
    const { data } = await apiClient.get(
      `/config/fetchTableDetails/${schemaName}/${tableName}`
    );
    return data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function updateApiApi(
  id: string | number,
  payload: Partial<CreateApiRequest>
): Promise<ApiEndpoint> {
  try {
    const { data } = await apiClient.put<ApiResponse<ApiEndpoint>>(
      `/apis/${id}`, // ← replace
      payload
    );
    return data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function deleteApiApi(id: string | number): Promise<void> {
  try {
    await apiClient.delete(`/apis/${id}`); // ← replace
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Execute a query in the API playground
 * ⚠️  Dummy endpoint: POST /apis/:id/execute
 */
export async function executeApiApi(
  id: string | number,
  params?: Record<string, unknown>
): Promise<unknown> {
  try {
    const { data } = await apiClient.post<ApiResponse<unknown>>(
      `/apis/${id}/execute`, // ← replace
      { params }
    );
    return data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
