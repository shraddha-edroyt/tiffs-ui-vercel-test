import apiClient from "@/lib/api/interceptors";
import { handleApiError } from "@/lib/api/errorHandler";

export interface FetchRoleApproversResponse {
  roleApprovers: string[];
}

export async function fetchRoleApproversApi(): Promise<string[]> {
  try {
    const { data } = await apiClient.get<FetchRoleApproversResponse>("/user/listRoleApprovers");
    return data.roleApprovers;
  } catch (error) {
    throw handleApiError(error);
  }
}
