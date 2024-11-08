import CustomAxios from "../../config/CustomAxios";
import accessToken from "../../utils/LocalStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const login = async (loginInput) => {
  try {
    const res = await CustomAxios.post("/api/login", {
      email: loginInput.email,
      password: loginInput.password,
    });
    accessToken.addAccessToken(res.data.token);
    return res.data.user;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (userData) => {
      console.log("useLogin", userData);
      queryClient.invalidateQueries(["authUser"]); // Invalidate the authUser query to refresh data
      toast.success("Login successful");
      if (userData.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
