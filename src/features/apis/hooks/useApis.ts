import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getApisApi,
  getApiByIdApi,
  createApiApi,
  updateApiApi,
  deleteApiApi,
} from "@/features/apis/services/apiService";
import { QUERY_KEYS } from "@/config/constants";
import { useCurrentUser } from "@/features/auth/store/authStore"
import type { PaginationParams, CreateApiRequest, ApiError } from "@/types/api.types";

export function useApis() {
  const user = useCurrentUser();
  const userName = user?.user_name || user?.email || "";

  return useQuery({
    queryKey: [...QUERY_KEYS.APIS.LIST, userName],
    queryFn: () => getApisApi(userName),
    enabled: !!userName, // Only run if we have a username
  });
}


export function useApi(endpointName: string, httpMethod: string) {
  return useQuery({
    queryKey: QUERY_KEYS.APIS.DETAIL(`${endpointName}-${httpMethod}`),
    queryFn: () => getApiByIdApi(endpointName, httpMethod),
    enabled: !!(endpointName && httpMethod),
  });
}

export function useCreateApi() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateApiRequest) => createApiApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.APIS.LIST });
      toast.success("API endpoint created.");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Failed to create API.");
    },
  });
}

export function useUpdateApi(id: string | number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<CreateApiRequest>) => updateApiApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.APIS.DETAIL(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.APIS.LIST });
      toast.success("API endpoint updated.");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Failed to update API.");
    },
  });
}

export function useDeleteApi() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteApiApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.APIS.LIST });
      toast.success("API endpoint deleted.");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Failed to delete API.");
    },
  });
}
