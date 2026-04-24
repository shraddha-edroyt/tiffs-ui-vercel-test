import { useMutation } from "@tanstack/react-query";
import { saveUserProfileApi } from "../services/userProfileService";
import type { UserProfileSave } from "@/types/api.types";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config/constants";

export function useSaveUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserProfileSave) => saveUserProfileApi(payload),
    onSuccess: () => {
      toast.success("User profile submitted successfully");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PROFILE });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to save user profile");
    },
  });
}
