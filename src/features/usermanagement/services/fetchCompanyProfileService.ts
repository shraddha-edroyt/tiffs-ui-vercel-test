import apiClient from "@/lib/api/interceptors";
import { handleApiError } from "@/lib/api/errorHandler";

export interface FetchCompanyProfileResponse {
  companyName?: string;
  taxId?: string;
  businessRegistrationNumber?: string;
  companyAddress1?: string;
  companyAddress2?: string;
  companyCity?: string;
  companyState?: string;
  companyPincode?: string;
  companyCountry?: string;
  companyDepartment?: string;
  companyJobTitle?: string;
}

export async function fetchCompanyProfileApi(): Promise<FetchCompanyProfileResponse> {
  try {
    const { data } = await apiClient.get("/user/fetchCompanyProfile");
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
}
