import { useQuery } from "@tanstack/react-query";
import { fetchCompanyProfileApi, FetchCompanyProfileResponse } from "../services/fetchCompanyProfileService";
import { QUERY_KEYS } from "@/config/constants";

export function useFetchCompanyProfile() {
  return useQuery<FetchCompanyProfileResponse, Error>({
    queryKey: QUERY_KEYS.COMPANY.PROFILE,
    queryFn: fetchCompanyProfileApi,
    staleTime: 5 * 60 * 1000,
  });
}
