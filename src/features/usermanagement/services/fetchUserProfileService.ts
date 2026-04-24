import apiClient from "@/lib/api/interceptors";
import { handleApiError } from "@/lib/api/errorHandler";

export interface FetchUserProfileResponse {
  userFullName: string;
  dob: string;
  role: string;
  jobTitle?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  accountStatus: string;
  kycStatus: string;
  employeeId: number;
  department?: string;
  approverFullName?: string;
  companyName?: string;
}

export async function fetchUserProfileApi(): Promise<FetchUserProfileResponse> {
  try {
    const { data } = await apiClient.get("/user/fetchUserProfile");
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
}
