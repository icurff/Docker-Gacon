import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../../config/CustomAxios";
import { toast } from "react-toastify";

const updatePassword = async ({
  oldPassword,
  newPassword,
  confirmPassword,
}) => {
  const response = await CustomAxios.post("/api/user/updatepassword", {
    old_password: oldPassword,
    new_password: newPassword,
    new_password_confirmation: confirmPassword,
  });
  console.log(response.data);
  return response.data;
};

export const useUpdatePasswordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Password updated successfully");
    },
    onError: (error) => {
      if (error.response && error.response.status === 400) {
        console.error("Error 400: Bad Request - Failed to update password");
        toast.error("Old passowrd is incorrect");
      } else {
        console.error("Error updating the password:", error);
        toast.error("An error occurred. Please try again.");
      }
    },
  });
};
