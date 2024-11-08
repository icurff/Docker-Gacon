import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
import { toast } from "react-toastify";

const updateUser = async (userData) => {
  try {
    const response = await CustomAxios.put(
      `/api/admin/users/${userData.userId}`,
      userData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.error);
  }
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error("Failed to update user");
    },
  });
};
