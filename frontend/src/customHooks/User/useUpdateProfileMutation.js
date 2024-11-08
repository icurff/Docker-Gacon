import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
import { toast } from "react-toastify";

const updateProfile = async ({ avatarUrl }) => {
  const response = await CustomAxios.post("/api/user/updateprofile", {
    avatar: avatarUrl,
  });
  console.log(response.data);
  return response.data;
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Password updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update");
    },
  });
};
