import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import CustomAxios from "../../config/CustomAxios";
const forgotPassword = async (email) => {
  const res = await CustomAxios.post("/api/forgot-password", {
    email,
  });
  return res.data;
};
export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Password reset link sent to your email");
    },
    onError: (error) => {
      toast.error("Email not found");
    },
  });
}
