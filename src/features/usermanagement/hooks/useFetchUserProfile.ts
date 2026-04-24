import { useQuery } from "@tanstack/react-query";
import { fetchUserProfileApi } from "../services/fetchUserProfileService";
import { QUERY_KEYS } from "@/config/constants";

export function useFetchUserProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.PROFILE,
    queryFn: fetchUserProfileApi,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: true,
  });
}
