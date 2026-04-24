import apiClient from "@/lib/api/interceptors";
import { handleApiError } from "@/lib/api/errorHandler";

export interface SaveCompanyProfileRequest {
  companyName: string;
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

export async function saveCompanyProfileApi(payload: SaveCompanyProfileRequest): Promise<unknown> {
  try {
    const { data } = await apiClient.post("/user/save/userCompanyInfo", payload);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
}
