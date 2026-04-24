import apiClient from "@/lib/api/interceptors";
import { handleApiError } from "@/lib/api/errorHandler";
import type { UserProfileSave } from "@/types/api.types";

export async function saveUserProfileApi(payload: UserProfileSave): Promise<unknown> {
  try {
    const { data } = await apiClient.post("/user/save/userProfile", payload);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
}
