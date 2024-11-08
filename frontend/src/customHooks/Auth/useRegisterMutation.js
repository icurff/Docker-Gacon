import CustomAxios from "../../config/CustomAxios";
import accessToken from "../../utils/LocalStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const register = async (registerInput) => {
  try {
    const res = await CustomAxios.post("/api/register", {
      email: registerInput.email,
      password: registerInput.password,
      password_confirmation: registerInput.passwordConfirmation,
    });
    accessToken.addAccessToken(res.data.token);
    return res.data.user;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export function useRegisterMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (userData) => {
      console.log("useLogin", userData);
      queryClient.invalidateQueries(["authUser"]); // Invalidate the authUser query to refresh data
      toast.success("register successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
