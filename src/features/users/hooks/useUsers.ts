import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getUsersApi,
  getUserByIdApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "@/features/users/services/userService";
import { QUERY_KEYS } from "@/config/constants";
import type { PaginationParams, CreateUserRequest, UpdateUserRequest } from "@/types/api.types";
import type { ApiError } from "@/types/api.types";

// ── List Users ────────────────────────────────────────────────

export function useUsers(params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.USERS.LIST, params],
    queryFn: () => getUsersApi(params),
  });
}

// ── Single User ───────────────────────────────────────────────

export function useUser(id: string | number) {
  return useQuery({
    queryKey: QUERY_KEYS.USERS.DETAIL(id),
    queryFn: () => getUserByIdApi(id),
    enabled: !!id,
  });
}

// ── Create User ───────────────────────────────────────────────

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserRequest) => createUserApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST });
      toast.success("User created successfully.");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Failed to create user.");
    },
  });
}

// ── Update User ───────────────────────────────────────────────

export function useUpdateUser(id: string | number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateUserRequest) => updateUserApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.DETAIL(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST });
      toast.success("User updated successfully.");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Failed to update user.");
    },
  });
}

// ── Delete User ───────────────────────────────────────────────

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteUserApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST });
      toast.success("User deleted.");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Failed to delete user.");
    },
  });
}
