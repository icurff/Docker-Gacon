import CustomAxios from "../../config/CustomAxios";
import accessToken from "../../utils/LocalStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const googleLogin = async (locationSearch) => {
  try {
    const res = await CustomAxios.get(`/auth/callback` + locationSearch);
    accessToken.addAccessToken(res.data.token);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export function useGoogleLoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: googleLogin,
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]); // Invalidate the authUser query to refresh data
      toast.success("login successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
