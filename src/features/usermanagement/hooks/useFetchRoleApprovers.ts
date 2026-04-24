import { useQuery } from "@tanstack/react-query";
import { fetchRoleApproversApi } from "../services/fetchRoleApproversService";
import { QUERY_KEYS } from "@/config/constants";

export function useFetchRoleApprovers() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.ROLE_APPROVERS,
    queryFn: fetchRoleApproversApi,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}
