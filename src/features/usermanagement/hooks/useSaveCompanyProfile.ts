import { useMutation } from "@tanstack/react-query";
import { saveCompanyProfileApi, SaveCompanyProfileRequest } from "../services/companyProfileService";
import toast from "react-hot-toast";

export function useSaveCompanyProfile() {
  return useMutation({
    mutationFn: (payload: SaveCompanyProfileRequest) => saveCompanyProfileApi(payload),
    onSuccess: () => {
      toast.success("Company profile submitted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to save company profile");
    },
  });
}
