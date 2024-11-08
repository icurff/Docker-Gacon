import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import CustomAxios from "../../config/CustomAxios";
const resetPassword = async (passwordInput) => {
  try {
    const res = await CustomAxios.put("/api/reset-password", {
      password: passwordInput.password,
      password_confirmation: passwordInput.passwordConfirmation,
      token: passwordInput.token,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully");
    },
    onError: (error) => {
      toast.error(
        "Reset link may be invalid or expired, please make a new reset request",
      );
    },
  });
}
